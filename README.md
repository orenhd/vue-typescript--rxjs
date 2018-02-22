# vue-typescript--rxjs
A fork of [vue-typescript--vuex](https://github.com/orenhd/vue-typescript--vuex), replacing Vuex state management with a set of module services maintaining RxJS BehaviorSubjects

A live version of this repository can be found [here](https://orenhd.github.io/vue-typescript--rxjs/) (Dev mode).

## Replaced features
- Replaced Vuex modules with a set of module services, responsible for:
 - Maintaining RxJS BehaviorSubjects as the module's data properties, including assignment of default values.
 - Exposing Methods for transmitting values to the above BehaviorSubjects.
 - Exposing Selectors of Observable type, for fetching the module data in view-digestable models by the Module components.
 - Local Storage synchronization of selected module data properties.
- Implemented [vue-rx](https://www.npmjs.com/package/vue-rx) for subscribing to the module services BehaviorSubjects inside templates of module components.
- Replaced Vue Material with [Vuetify](https://vuetifyjs.com/en/) for Material components implementation.
