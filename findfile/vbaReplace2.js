 Dim ArrFiles(1 To 10000)
 Dim cntFiles%

 Public Sub CommandButton1_Click()
 Application.ScreenUpdating = False
 Dim myPas As String, myPath As String, i As Integer, myDoc As Document

 With Application.FileDialog(msoFileDialogFolderPicker)
    .Title = "选择目标文件夹"
    If .Show = -1 Then
     myPath = .SelectedItems(1)
    Else
     Exit Sub
    End If
 End With
 'myPas = InputBox("请输入打开密码：")
 


    Set fso = CreateObject("Scripting.FileSystemObject")
    Dim fd As Folder
    Set fd = fso.GetFolder(myPath)
    SearchFiles fd  '获得文件数组
    
    
    Dim OldStr, NewStr
    'SCSP1.0.0


    OldStr = Array("姜召才", "王伟", "宋祥峰", "孙迎", "魏成龙", "智慧社区结构化", "展望信息科技股份", "SCSP", "王丽", "苏旭", "安听涛", "夏金", "薛涵", "韩桢", "孙迎", "3月", "2019年", "SCSP","2019-08","2019-09","2019-10","2019-11","2019-12","2020-01","车辆","2020-02","门禁","楼宇","2019","社区","人口","房屋","出入","人员抓拍")
    NewStr = Array("马万亮", "刘伟", "刘挺", "迟翠林", "戴平", "经济运行分析", "精益信息科技", "EOAP", "李振", "周苏健", "霍昌晖", "温宇锋", "苑景惠", "陈文亮", "迟翠林", "6月", "2020年", "EOAP","2020-03","2020-04","2020-05","2020-06","2020-07","2020-08","","2020-08","数据","流向","2020","模块","","流程","","数据快照")
   
    'OldStr = Array("PJ20200606")
    'NewStr = Array("EOAP1.0.0")
   
   
    Dim m As Variant
    
    Const wdReplaceAll = 2
    Set objWord = CreateObject("Word.Application")
    objWord.Visible = True
    
    Dim tmp As Variant  '对于For循环必须声明为Var变量
    For Each tmp In ArrFiles
        Set objDoc = objWord.Documents.Open(tmp)
        Set objSelection = objWord.Selection
        
        For m = 0 To UBound(OldStr)
            objSelection.Find.Text = OldStr(m)
            objSelection.Find.Forward = True
            objSelection.Find.MatchWholeWord = True
            objSelection.Find.Replacement.Text = NewStr(m)
            objSelection.Find.Execute , , , , , , , , , , wdReplaceAll
        Next m
        
        objDoc.Save
        'objDoc.Close
        Set objDoc = Nothing
        Set objSelection = Nothing
        
    Next tmp
    Set objWord = Nothing
    MsgBox "转换完成"
        
End Sub

Sub SearchFiles(ByVal fd As Folder) '用户类型未定义，“引用”对话框中选中“Microsoft Scripting Runtime”前的复选框
    Dim fl As File
    Dim sfd As Folder
    For Each fl In fd.Files
        cntFiles = cntFiles + 1
        ArrFiles(cntFiles) = fl.Path
    Next fl
    
    If fd.SubFolders.Count = 0 Then Exit Sub
    For Each sfd In fd.SubFolders
        SearchFiles sfd
    Next
End Sub



// 'MsgBox fso1.GetExtensionName(tmp)
// Set wb = Workbooks.Open(fp & tmp)
// For Each ws In wb.Worksheets
//     For m = 0 To UBound(OldStr)
//         With ws
//             .Replace What:=OldStr(m), Replacement:=NewStr(m), LookAt:=xlPart, _
//             SearchOrder:=xlByRows, MatchCase:=False, SearchFormat:=False, _
//             ReplaceFormat:=False
        
//         End With
//     Next m
// Next ws
// wb.Close savechanges:=True



Dim ArrFiles(1 To 10000)
Dim cntFiles%

Public Sub CommandButton1_Click()
Application.ScreenUpdating = False
Dim myPas As String, myPath As String, i As Integer, myDoc As Document

With Application.FileDialog(msoFileDialogFolderPicker)
   .Title = "选择目标文件夹"
   If .Show = -1 Then
    myPath = .SelectedItems(1)
   Else
    Exit Sub
   End If
End With
'myPas = InputBox("请输入打开密码：")



   Set fso = CreateObject("Scripting.FileSystemObject")
   Dim fd As Folder
   Set fd = fso.GetFolder(myPath)
   SearchFiles fd  '获得文件数组
   
   
   Dim OldStr, NewStr
   
   OldStr = Array("姜召才", "王伟", "宋祥峰", "孙迎", "魏成龙", "智慧社区结构化", "展望信息科技股份", "SCSP", "王丽", "苏旭", "安听涛", "夏金", "薛涵", "韩桢", "孙迎", "3月", "2019年", "SCSP", "2019-08", "2019-09", "2019-10", "2019-11", "2019-12", "2020-01", "车辆", "2020-02", "门禁", "楼宇", "2019", "社区", "人口", "房屋", "出入", "人员抓拍")
   NewStr = Array("马万亮", "刘伟", "刘挺", "迟翠林", "戴平", "经济运行分析", "精益信息科技", "EOAP", "李振", "周苏健", "霍昌晖", "温宇锋", "苑景惠", "陈文亮", "迟翠林", "6月", "2020年", "EOAP", "2020-03", "2020-04", "2020-05", "2020-06", "2020-07", "2020-08", "", "2020-08", "数据", "流向", "2020", "模块", "", "流程", "", "数据快照")
  
   
   Dim m As Variant

   
   Const wdReplaceAll = 2
   Set objWord = CreateObject("Word.Application")
   Set objExcel = CreateObject("Excel.Application")
   objWord.Visible = True
   objExcel.Visible = False
   
   'Dim wb As Workbook
   Dim ws As Worksheet
   Dim objBook As Object
   
   Dim tmp As Variant  '对于For循环必须声明为Var变量
   Dim fso1 As New FileSystemObject

   
   For Each tmp In ArrFiles
       
     If (fso1.GetExtensionName(tmp) = "doc" Or fso1.GetExtensionName(tmp) = "docx") Then
       Set objDoc = objWord.Documents.Open(tmp)
       Set objSelection = objWord.Selection
       
       For m = 0 To UBound(OldStr)
           objSelection.Find.Text = OldStr(m)
           objSelection.Find.Forward = True
           objSelection.Find.MatchWholeWord = True
           objSelection.Find.Replacement.Text = NewStr(m)
           objSelection.Find.Execute , , , , , , , , , , wdReplaceAll
       Next m
       
       objDoc.Save
       'objDoc.Close
       Set objDoc = Nothing
       Set objSelection = Nothing
       
     ElseIf (fso1.GetExtensionName(tmp) = "xls" Or fso1.GetExtensionName(tmp) = "xlsx") Then
       
       Set objBook = objExcel.Workbooks.Open(tmp)
       objBook.Unprotect
        For Each ws In objBook.Worksheets
           ws.Activate
           'ws.Unprotect
           ActiveSheet.Unprotect
           'MsgBox ws.Protect: Contents
           'ws.Cells.Locked = True
           MsgBox ws.Name & objBook.Name
           
           For m = 0 To UBound(OldStr)
               ActiveSheet.UsedRange.Cells.Replace "OldStr(m)", "NewStr(m)"
           Next m
       Next ws
       objBook.Save
       'objDoc.Close
       Set ws = Nothing
       Set objBook = Nothing
     End If
       
   Next tmp
   
   Set objWord = Nothing
   Set objExcel = Nothing
   MsgBox "转换完成"
       
End Sub

Sub SearchFiles(ByVal fd As Folder) '用户类型未定义，“引用”对话框中选中“Microsoft Scripting Runtime”前的复选框
   Dim fl As File
   Dim sfd As Folder
   For Each fl In fd.Files
       cntFiles = cntFiles + 1
       ArrFiles(cntFiles) = fl.Path
   Next fl
   
   If fd.SubFolders.Count = 0 Then Exit Sub
   For Each sfd In fd.SubFolders
       SearchFiles sfd
   Next
End Sub




