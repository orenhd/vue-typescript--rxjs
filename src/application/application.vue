<template>
  <v-app id="application">
    <v-navigation-drawer
      fixed
      v-model="menuVisible"
      app
    >
      <v-toolbar flat>
        <v-list>
          <v-list-tile>
            <v-list-tile-title class="title">
              {{$t("general.navigation")}}
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-toolbar>
      <v-list dense>
        <v-list-tile to="/clicking-example" @click="menuVisible = false">
          <v-list-tile-action>
            <v-icon>mouse</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{$t("clickingExample.clickingExample")}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile to="/top-twenty" @click="menuVisible = false">
          <v-list-tile-action>
            <v-icon>album</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>{{$t("topTwentyAlbums.topTwentyAlbums")}}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar color="indigo" dark fixed app>
      <v-toolbar-side-icon @click.stop="menuVisible = !menuVisible"></v-toolbar-side-icon>
      <v-toolbar-title>{{userName$ ? $t("general.greeting", [userName$]) : ''}}</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Observable } from 'rxjs/Observable';
import VueI18n from 'vue-i18n';

/* module components */
import ClickingExample from "../modules/clickingExample/clickingExample.vue";
import TopTwentyAlbums from "../modules/topTwentyAlbums/topTwentyAlbums.vue";

import * as clickingExampleService from "../modules/clickingExample/clickingExample.service";

@Component({components: {ClickingExample, TopTwentyAlbums}, subscriptions: () => {
    return {
        userName$: clickingExampleService.userName$
    }
}})
export default class Application extends Vue {

    // only app. component parameters are not managed by the store, 
    // in order to use the v-app material component, which makes use of the v-model, out-of-the-box

    menuVisible: boolean = false;
}
</script>

<style lang="scss" scoped>
</style>
