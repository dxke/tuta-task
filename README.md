# tuta-task

URL-Checker for Tuta Job Application

## Aufgabe

Browser-Anwendung in Javascript oder Typescript, die dem Benutzer erlaubt zu prüfen, ob eine eingegebene URL existiert. Der Benutzer soll eine URL eingeben können und die URL soll dann auf ein gültiges Format geprüft werden.
Wenn das Format korrekt ist, soll die URL zu einem Server gesendet werden, der die Info zurückgibt,
ob die URL existiert und
ob sie auf eine Datei oder einen Ordner zeigt.
Du sollst keinen echten Server implementieren, sondern den Server auf der Client-Seite mocken.
Der Server-Aufruf soll asynchron sein.

Die Prüfung des Formats der URL und die Prüfung der Existenz soll ausgelöst werden während der Benutzer die URL eintippt, aber die Existenzprüfung soll gethrottled sein, um zu verhindern, dass zu viele Server-Anfragen gemacht werden.
Diese Aufgabe sollte nicht mehr als zwei bis drei Stunden in Anspruch nehmen.
