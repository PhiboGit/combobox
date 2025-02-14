# **Architektur für moderne Front-end Anwendungen mit React**  

Eine durchdachte Ordnerstruktur ist essenziell für die Wartbarkeit und Skalierbarkeit einer React-Anwendung. Wir betrachten zwei Architekturkonzepte, **Bulletproof-React** und **Feature-Sliced Design (FSD)** kombiniert, mit einer klaren Trennung zwischen Shared-Code und Features.
Ziele:
* Modularität: effiziente Interaktion zwischen verschiedene Komponenten (reusable Code)
* verbesserte Projekt Navigation: Die Strukture soll es einem erleichtern sich in dem Projekt zurecht zufinden. (screaming Architecture - clean code)
* Trennung der Business Logik von allgemeinem Code. 

## **Grundprinzipien der Architektur**  

Diese Struktur basiert auf den folgenden Regeln:  

* **Shared-Zone für wiederverwendbaren Code**: Enthält allgemeine UI-Komponenten, API-Anbindungen, Utils, Hooks, Stores und Provider**, aber keine Business-Logik.  
* **Feature-Sliced Design für Geschäftslogik**: Jedes Feature ist eigenständig, hat keinen Zugriff auf andere Features, kann aber Code aus "Shared" importieren.  
* **Barrel Files (`index.ts`)**: Definieren eine öffentliche API für Features und verhindern unkontrollierte Exporte.  
* **ESLint: Setzt die Architektur durch. Verstöße gegen Konventionen werden direkt erkannt.  


## **Hierarchie und Zugriffskontrolle**  

Die Architektur basiert auf ESLint-regulierten "Zones/Layers", die definieren, welche Teile des Codes aufeinander zugreifen dürfen:  

- **Shared (Zone, kein Ordner)**: Enthält wiederverwendbaren Code ohne Business-Logik, z. B. UI-Komponenten, Hooks, Stores, APIs und Utilities.  
- **Features**: Implementieren vollständige Produkt-Features, die dem Nutzer Business-Wert liefern. Jedes Feature ist eigenständig und darf nur auf Shared zugreifen.  
- **Widgets**: Kombinieren Features und bilden größere, selbstständige UI- oder Funktionseinheiten, die ganze Anwendungsfälle abdecken. Sie haben Zugriff auf Shared und Features.  
- **App**: Stellt das*Routing, Einstiegspunkte, globale Styles und Provider bereit. Es hat Zugriff auf alle Zonen.   

```bash
src/
│── app/              # App-Initialisierung, globale Provider, Routing
│   ├── routing/      # Definiert alle App-Routen
│── shared/           # Wiederverwendbarer Code ohne Business-Logik
│   ├── api/          # Zentrale API-Clients (z. B. React Query Setup)
│   ├── components/   # Wiederverwendbare UI-Komponenten (z. B. shadcn)
│   ├── hooks/        # Allgemeine React-Hooks
│   ├── stores/       # State-Management (z. B. Zustand)
│   ├── utils/        # Wiederverwendbare Hilfsfunktionen
│── features/         # Feature-spezifische Implementierungen
│   ├── featureA/     
│   │   ├── api/      # Feature-spezifische API-Endpunkte
│   │   ├── ui/       # Feature-spezifische UI-Komponenten
│   │   ├── utils/    # Business-Logik für das Feature
│   │   ├── index.ts  # Öffentliche API des Features
│── widgets/          # Wiederverwendbare, Feature-übergreifende UI-Komponenten
```

> Wo werden eigene generelle Components angesiedelt?
> werden in App(routing) Features zu Seiten(Pages) zusammen geführt?


## **Barrel Files**  

**Barrel Files** (`index.ts`) sorgen dafür, dass nur eine kontrollierte, öffentliche API eines Features exportiert wird.  
So wird verhindert, dass interne Implementierungsdetails direkt importiert werden.

Und Nachteile von Barrel Files: 

```bash
features/profile/
│── api/
│   ├── profile.api.ts    # API-Endpunkte für Profile
│── ui/
│   ├── ProfileCard.tsx   # UI-Komponente für Profilanzeige
│── utils/
│   ├── profileUtils.ts   # Business-Logik für Profile
│── index.ts              # Öffentliche API des Features
```


```ts
export { ProfileCard } from "./ui/ProfileCard";
export * as ProfileAPI from "./api/profile.api";
```

```ts
import { ProfileCard } from "@/features/profile";
```

## ESLint

Mit eslint-plugins lassen sich eine Reihe dieser Regeln implementieren.

- bondaries

