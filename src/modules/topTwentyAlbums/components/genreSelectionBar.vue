<template>
    <v-flex xs3 class="mx-3 mt-3">
        <v-select
        v-if="currentGenre"
        :items="genres"
        :label="$t('topTwentyAlbums.genre')"
        item-text="title"
        item-value="id"
        :value="currentGenre ? currentGenre.id : null" 
        @change="genreSelected($event)"
        ></v-select>
    </v-flex>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

import * as dataModels from '../topTwentyAlbums.DataModels';
import * as viewModels from '../topTwentyAlbums.ViewModels';

@Component({components: {}, directives: {}})
export default class GenreSelectionBar extends Vue {

    @Prop() genres: dataModels.ITunesGenre[];
    @Prop() currentGenre: dataModels.ITunesGenre;

    genreSelected(genreId: string) {
        this.$emit('genreSelected', parseInt(genreId));
    }
    
}
</script>

<style lang="scss" scoped>
    @import '~styles/variables'; //tilde to resolve 'like a module'

    .genre-select {
        height: 2em;
        font-size: 1em;
        margin: 0.25em 1em;
    }
    
</style>
