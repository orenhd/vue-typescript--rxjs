<template>
    <div class="top-twenty-albums">
        <genre-selection-bar 
            :genres="genres$"
            :currentGenre="currentGenre$"
            @genreSelected="loadAlbumEntriesByGenreId($event)"
        >
        </genre-selection-bar>
        <albums-list :albumEntriesList="albumEntriesList$"></albums-list>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Observable } from 'rxjs/Observable';

import GenreSelectionBar from "./components/genreSelectionBar.vue";
import AlbumsList from "./components/albumsList.vue";

import * as topTwentyAlbumsService from "./topTwentyAlbums.service";

import * as dataModels from './topTwentyAlbums.DataModels';
import * as viewModels from './topTwentyAlbums.ViewModels';

@Component({components: {GenreSelectionBar, AlbumsList}, directives: {}, subscriptions: () => {
    return {
            genres$: topTwentyAlbumsService.genres$,
            currentGenre$: topTwentyAlbumsService.currentGenre$,
            albumEntriesList$ : topTwentyAlbumsService.albumEntriesList$
    }
}})
export default class TopTwentyAlbums extends Vue {
    
    /* Lifecycle Methods */

    beforeCreate() {
        topTwentyAlbumsService.loadGenreIds();
    }

    /* Component Methods */

    loadAlbumEntriesByGenreId(genreId: number) {
        topTwentyAlbumsService.loadAlbumEntriesByGenreId(genreId);
    }
}
</script>

<style lang="scss" scoped>
    @import '~styles/variables'; //tilde to resolve 'like a module'
</style>
