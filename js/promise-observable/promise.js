console.clear();

var promise =new Promise((resolve)=>{
    setTimeout(()=>{
        console.log('promise timeout hit');
        resolve(42);
    },1000);
    console.log('promise started');
})

promise.then(x => console.log(x));


// var source = Rx.Obervable.create((observer)=>{
var source = rxjs.Obervable.create((observer)=>{
    var id = setTimeout(()=>{
        console.log('oberservable timeout hit')
        observer.onNext(43)
    },1000)
    console.log('observable started')

    return ()=>{
        console.log('dispose called')
        clearTimeout(id)
    }
})

var disposable = source.forEach(x => {
    console.log(x)
});

setTimeout(() => {
    disposable.dispose()
},500)