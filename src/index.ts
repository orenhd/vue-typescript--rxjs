/**
 * index.ts
 * - Responsible only for init. of the Vue and Vuex instances, 
 * by loading the main Application Component, including its routing and store options.
 **/

import Vue from "vue";
import VueRouter from "vue-router";
import VueI18n from 'vue-i18n';

import VueRx from 'vue-rx'
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import AppRoutes from "./application/application.routes";

import AppI18n from "./application/application.i18n";

import Application from "./application/application.vue"

declare var Vuetify: any;

Vue.use(Vuetify);

Vue.use(VueRx, {
    Observable,
    BehaviorSubject
});

const appRouter: VueRouter = new VueRouter({
    routes: AppRoutes
}) 

let vueInstance = new Vue({
    el: "#app",
    template: '<application></application>',
    components: { Application },
    router: appRouter,
    i18n: AppI18n
});