<%
Option Explicit

Dim names, q, i, name, suggestions
names = Array("Anna", "Brittany", "Cinderella", "Diana", "Eva", _
              "Fiona", "Gunda", "Hege", "Inga", "Johanna", _
              "Kitty", "Linda", "Nino", "Ophelia", "Petunia", _
              "Amanda", "Raquel", "Susan", "Tina", "Uma", _
              "Vera", "Wendy", "Xena", "Yvonne", "Zelda")

q = LCase(Trim(Request.QueryString("q")))
suggestions = ""

If q <> "" Then
    For i = 0 To UBound(names)
        name = names(i)
        If LCase(Left(name, Len(q))) = q Then
            If suggestions <> "" Then
                suggestions = suggestions & ", "
            End If
            suggestions = suggestions & name
        End If
    Next
End If

If suggestions = "" Then
    Response.Write "No suggestions"
Else
    Response.Write suggestions
End If
%>
