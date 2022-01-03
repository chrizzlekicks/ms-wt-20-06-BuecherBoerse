<p align="center">
  <a href="http://dev.app.kodebi.de">
    <img src="client/src/static/kodebi_logo_classic.svg" width="250">
  </a>
</p>
<h1 align="center">
  Kodebi Web App
</h1>

## Installationsanleitung

Der einfachste Weg die Applikation zu starten ist via Docker. Lade dir hierfür vorher entweder `Docker Desktop` (für MacOS und Windows) oder das `Docker CLI` (für Linux herunter) [https://www.docker.com/get-started](https://www.docker.com/get-started) herunter, klone das Repository und navigiere in den Zielordner. Dann führe folgenden Befehl aus:

```shell
docker-compose -p kodebi up -d --force-recreate
```

Die notwendigen Images sollten via respektiver Dockerfiles gebaut und die dafür notwendigen Pakete installiert werden. Checke via `Docker Desktop` oder `Docker CLI` ob die Container laufen. Starte die Applikation im Browser via [http://localhost:3000](http://localhost:3000). Um die Container zu stoppen, nutze

```shell
docker-compose -p kodebi stop
```

Möchtest du die Images ganz von deiner Hostmaschine entfernen, so exekutiere folgenden Befehl:

```shell
docker-compose -p kodebi down --rmi all
```

Möchtest du nur die Container entfernen, so lass die `--rmi all` Flag weg. Dies ist der einfachste Weg um die Applikation zu starten und ohne große Vorkonfiguration zu entwickeln.

Solltest du eher interessiert an einer lokalen Entwicklungsalternative interessiert sein, so schaue dir die jeweiligen Dokus an.

### Doku zum Frontend

[Öffne Frontend](client/)

### Doku zum Backend

[Öffne Backend](server/)
