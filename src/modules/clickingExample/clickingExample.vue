<template>
    <div class="clicking-example mx-3 my-3">
        <user-name-bar
            :userName="userName$"
            @userNameChanged="setUserName($event)"
        >
        </user-name-bar>
        <clicking-panel
            :clickingData="clickingData$"
            @homeButtonClicked="homeButtonClicked()"
            @homeButtonClickedOutside="homeButtonClickedOutside()"
        >
        </clicking-panel>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { Observable } from 'rxjs/Observable';

import UserNameBar from "./components/userNameBar.vue";
import ClickingPanel from "./components/clickingPanel.vue";

import ClickOutside from "../../shared/directives/clickOutside";

import * as clickingExampleService from "./clickingExample.service";

import * as dataModels from "./clickingExample.dataModels";

@Component({components: {UserNameBar, ClickingPanel}, subscriptions: () => {
    return {
        userName$: clickingExampleService.userName$,
        clickingData$: clickingExampleService.clickingData$
    }
}})
export default class ClickingExample extends Vue {

    /* Component Methods */

    setUserName(userName: string) {
        clickingExampleService.setUserName(userName);
    }

    homeButtonClicked() {
        clickingExampleService.homeButtonClicked();
    }

    homeButtonClickedOutside() {
        clickingExampleService.homeButtonClickedOutside();
    }
}
</script>

<style lang="scss" scoped>
    @import '~styles/variables'; //tilde to resolve 'like a module'
</style>
