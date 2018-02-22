<template>
        <v-list three-line>
          <template v-for="(albumEntry, index) in albumEntriesList">
            <v-list-tile avatar :key="albumEntry.id">
              <v-list-tile-avatar>
                <img :src="albumEntry.thumbnail">
              </v-list-tile-avatar>
              <v-list-tile-content>
                <v-list-tile-title>{{albumEntry.title}}</v-list-tile-title>
                <v-list-tile-sub-title>{{albumEntry.artist}}</v-list-tile-sub-title>
                <v-list-tile-action-text>{{albumEntry.copyright}}</v-list-tile-action-text>
              </v-list-tile-content>
            </v-list-tile>
          </template>
        </v-list>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

import * as viewModels from '../topTwentyAlbums.viewModels';

@Component({components: {}, directives: {}})
export default class AlbumsList extends Vue {

    @Prop() albumEntriesList: viewModels.AlbumEntryListItem[];
}
</script>

<style lang="scss" scoped>
    @import '~styles/variables'; //tilde to resolve 'like a module'
</style>
