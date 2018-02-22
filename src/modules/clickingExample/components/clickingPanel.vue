<template>
    <div class="clicking-panel">
        <v-btn class="mb-3" fab dark small color="pink" @click="homeButtonClicked" v-click-outside="homeButtonClickedOutside">
            <v-icon>home</v-icon>
        </v-btn>
        <p class="clicking-data-text" v-if="this.clickingData && this.clickingData.homeButtonClickCount">{{$tc('clickingExample.homeButtonClicked', this.clickingData.homeButtonClickCount, { count: this.clickingData.homeButtonClickCount })}}</p>
        <p class="clicking-data-text" v-if="this.clickingData && this.clickingData.homeButtonClickOutsideCount">{{$tc('clickingExample.homeButtonClickedOutside', this.clickingData.homeButtonClickOutsideCount, { count: this.clickingData.homeButtonClickOutsideCount })}}</p>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

import * as dataModels from '../clickingExample.dataModels';

import ClickOutside from "../../../shared/directives/clickOutside";

@Component({directives: {'click-outside' : ClickOutside}})
export default class ClickedButton extends Vue {
    @Prop() clickingData: dataModels.ClickingData;

    homeButtonClicked() {
        this.$emit('homeButtonClicked');
    }

    homeButtonClickedOutside() {
        this.$emit('homeButtonClickedOutside');
    }
}
</script>

<style lang="scss" scoped>
    .clicking-data-text {
        user-select: none;
    }
</style>
