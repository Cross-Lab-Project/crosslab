### Macht es Sinn eine Buchung zu locken?

Ja denn es könnte vorkommen, dass bei der Behandlung eines Callbacks eine direkte Umbuchung einer Gerätegruppe erfolgt, ohne dass die Buchung in den Status `rejected` wecheln muss.

### Wird der Status `locked-rejected` benötigt?

Wenn ein Gerät nichtmehr verfügbar ist, dann wurde entweder die Verfügbarkeit des Geräts in einem `device-changed`-Callback verändert oder das Gerät wurde gelöscht (Mitteilung durch `device-deleted`-Callback). In beiden Fällen ist nicht absehbar, dass die Buchung wieder gerettet werden kann. Dementsprechend könnte die Buchung auch auf den Status `rejected` gesetzt werden. Nehmen wir an die Buchung enthält eine Gerätegruppe, deren ausgewähltes Gerät durch einen Callback nichtmehr reserviert werden kann. Bei einer gelockten Buchung kann man von einem aktuell laufenden Experiment ausgehen.

### Sollte die Eigenschaft `connected` von konkreten Geräten betrachtet werden?

Die Eigenschaft `connected` von konkreten Geräten ist nur während einem laufenden Experiment von Interesse. Sollte ein Gerät offline gehen könnte man es ggf. austauschen. Allerdings macht es wahrscheinlich mehr Sinn, diese Aufgabe dem Experimentdienst zu überlassen. Dieser kann die Buchung unlocken (wodurch Gerätegruppen neue Geräte auswählen können) und dann ggf. das konkrete Gerät austauschen.

### Sollten alle Reservierungen einer Buchung mit Status `rejected` gelöscht werden?

- macht die Überprüfung ob Buchung wieder akzeptiert werden kann aufwändiger
- Reservierungen einer abgelehnten Buchung sollten gelöscht werden sobald eine akzeptierte Buchung überschneidende Reservierungen beinhaltet
- wenn das Ende einer Buchung erreicht wird, oder eine Buchung gelöscht wird sollte überprüft werden ob die enthaltenen Geräte nun für andere Buchungen reserviert werden können

### Wie sollten Reservierungen von Buchungen mit dem Status `rejected` behandelt werden?

#### Option 1: Alle Reservierungen löschen

- Neubuchung wird erschwert, da immer alle Reservierungen neu erstellt werden müssen

#### Option 2: Reservierungen löschen wenn überschneidende Buchung Status `accepted` erhält

- Bei Neubuchung müssen nur nicht vorhandene Reservierungen neu erstellt werden
- Beim Löschen von Buchungen mit Status `accepted` bzw. beim Übergang in den Zustand `rejected`/`impossible` muss Überprüfung von überlappenden Buchungen mit Status `rejected` erfolgen, die entsprechende Geräte ohne Reservierung beinhalten

### TODOs

- [ ] Callback Handling
- [ ] Mutex/Queue
- [ ] Handling of failing updates
- [ ] Handling of non-essential devices
- [ ] device-changed callback: first delete invalid reservations then try reserving
