import { Component, OnInit, OnDestroy, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { NzDropdownService, NzDropdownContextComponent } from 'ng-zorro-antd';
import { combineLatest, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Todo, List } from '../../../../../domain/entities';
import { TodoService } from '../../../../services/todo/todo.service';
import { ListService } from '../../../../services/list/list.service';
import { floorToDate, getTodayTime } from '../../../../../utils/time';
import { RankBy } from '../../../../../domain/type';


const rankerGenerator = (type: RankBy = 'title'): any => {
  if (type === 'completeFlag') {
    return (t1: Todo, t2: Todo) => t1.completedFlag && !t2.completedFlag;
  }
  return (t1: Todo, t2: Todo) => t1[ type ] > t2[ type ];
};


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: [ './todo.component.less' ]
})
export class TodoComponent implements OnInit, OnDestroy {
  private dropdown: NzDropdownContextComponent;
  private destory$ = new Subject();

  todos: Todo[] = [];
  lists: List[] = [];
  currentContextTodo: Todo;

  constructor(
    private listService: ListService,
    private todoService: TodoService,
    private dropdownService: NzDropdownService,
    private router: Router
  ) { }

  ngOnInit() {
    this.listService.lists$
      .pipe(takeUntil(this.destory$))/**takeUntil写在switchMap前面，那么takeUntil虽然结束了，但是switchMap这个流依然没被关闭。于是乎，将takeUntil放在switchMap后面，尝试之后问题确实解决了。
      当 this.complete$ 结束时，由takeUntil操作符返回的 observable 就算完成了，其订阅也会被自动取消。
      然而，由于 stream$的订阅者所订阅的 observable 并非由 takeUntil返回，而是由 switchMap返回，所以当takeUntil的observable 完成时，stream$ 的订阅是不会被自动取消的。
      在switchMap的所有 observable 全部完成之前，stream$ 的订阅者都将始终保持订阅。所以，除非 combineLatest率先完成，否则这个订阅将不会结束
       */
      .subscribe(lists => {
        this.lists = lists;
        console.log("todoCom,lists:",this.lists)
        console.log("todoCom,destory$:",this.destory$)
      });

    combineLatest(
      this.listService.currentUuid$,
      this.todoService.todo$,
      this.todoService.rank$,
      this.todoService.completedHide$
      )
      .pipe(takeUntil(this.destory$))
      .subscribe(sources => {
        this.processTodos(sources[ 0 ], sources[ 1 ], sources[ 2 ], sources[3]);
        console.log("todoCom,sources:",sources)
      });
    this.todoService.getAll();
    this.listService.getAll();
    console.log("todoCom,todoService:",this.todoService)
    console.log("todoCom,listService:",this.listService)
  }

  ngOnDestroy() {
    this.destory$.next();
    this.destory$.complete();
  }

  private processTodos(listUUID: string, todos: Todo[], rank: RankBy, completedHide: boolean): void {
    console.log("todo:processTodos():",todos);
    const filteredTodos = todos
      .filter(todo => {
        return ((listUUID === 'today' && todo.planAt && floorToDate(todo.planAt) <= getTodayTime()) //如果这条为真，那么后面的||就不用考虑了，直接返回&&的最后一项，表达式结果为true
          || (listUUID === 'todo' && (!todo.listUUID || todo.listUUID === 'todo'))
          || (listUUID === todo.listUUID));
      })
      .map(todo => Object.assign({}, todo) as Todo)
      .sort(rankerGenerator(rank))
      .filter(todo => completedHide ? !todo.completedFlag : todo);

    this.todos = [].concat(filteredTodos);
  }

  add(title: string): void {
    this.todoService.add(title);
  }

  click(uuid: string): void {
    console.log("todo:click(uuid):",uuid)
    console.log("todo:click(todos[]):",this.todos)
    this.router.navigateByUrl(`/main/${uuid}`);
  }

  contextMenu(
    $event: MouseEvent,
    template: TemplateRef<void>,
    uuid: string
  ): void {
    this.dropdown = this.dropdownService.create($event, template);
    this.currentContextTodo = this.todos.find(t => t._id === uuid);
  }

  listsExcept(listUUID: string): List[] {
    return this.lists.filter(l => l._id !== listUUID);
  }

  toggle(uuid: string): void {
    this.todoService.toggleTodoComplete(uuid);
  }

  delete(): void {
    this.todoService.delete(this.currentContextTodo._id);
  }

  setToday(): void {
    this.todoService.setTodoToday(this.currentContextTodo._id);
  }

  moveToList(listUuid: string): void {
    this.todoService.moveToList(this.currentContextTodo._id, listUuid);
  }

  close(): void {
    this.dropdown.close();
  }
}
