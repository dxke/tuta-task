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

### Mein Kommentar

Verwendet:
HTML / CSS / JavaScript
für JS:
Node.js, Webpack
npm dependencies sind gelistet in package.json
Bei der Entwicklung des Projekts habe ich bewusst darauf geachtet, möglichst wenige npm-Pakete und dependencies zu verwenden.

## Wie kann man dieses Projekt verwenden:

Node.js installieren
zum root directory dieses Projekts gehen
ausführen: _npm install_ um die dependencies zu installieren die in package.json gelistet sind
das project via webpack builden: _npm run build_
server starten via _node server_
index.html im dist/ directory öffnen

## Wie kann dieses Projekt getestet werden:

Im input-Feld eingeben:

# http://localhost:8000/example-folder/

Ergebnis: _Directory exists: ..._

# http://localhost:8000/example-folder/example.html

Ergebnis: _File exists: ..._

# http://localhost:8000/example-folder/example

Ergebnis: _URL does not point to a file or folder_

# anyinputthatsnotaURL

Ergebnis: _Invalid URL format_
