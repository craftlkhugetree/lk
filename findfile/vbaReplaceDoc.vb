Sub CommandButton1_Click()
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
 
 Set fs = Application.FileSearch
 'Set fso = CreateObject("Scripting.FileSystemObject")
 'Dim fso As New FileSystemObject, fd As Folder
 'Set fd = fso.GetFolder(myPath)
 'Set fs = SearchFiles(fd)

 With fs
    .LookIn = myPath
    .FileType = msoFileTypeWordDocuments
    If .Execute > 0 Then
     For i = 1 To .FoundFiles.Count
       Set myDoc = Documents.Open(FileName:=.FoundFiles(i)) ', Passworddocument:=myPas
       Selection.Find.ClearFormatting
       Selection.Find.Replacement.ClearFormatting
       With Selection.Find
       .Text = "姜召才"
       .Replacement.Text = "马万亮"
       .Forward = True
       .Wrap = wdFindAsk
       .Format = False
       .MatchCase = False
       .MatchWholeWord = False
       .MatchByte = True
       .MatchWildcards = False
       .MatchSoundsLike = False
       .MatchAllWordForms = False
      End With
      Selection.Find.Execute Replace:=wdReplaceAll
      myDoc.Save
      myDoc.Close
      Set myDoc = Nothing
     Next
    End If
 End With
 Application.ScreenUpdating = True
End Sub

