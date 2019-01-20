Kwejk, aplikacja pozwalająca na wrzucania zdjęć. 
Inspirowana kwejk.pl



Aby uruchomić aplikację, potrzebujemy Dockera. Poniższa komenda odpala serwer express z mongodb pozwalając na działanie API.

```bash
docker-compose up
```

Frontend oparty na Angular@7 uruchamiamy przez komendę:

```
ng serve
```

lub przez wygenerowaniu plików:

```
ng build
```

i odpalenia aplikacji ręcznie.


W .env ustawiamy miejsce przechowywania plików

```
'imgur' or 'node' (save on '/uploads' in your app folder)
```