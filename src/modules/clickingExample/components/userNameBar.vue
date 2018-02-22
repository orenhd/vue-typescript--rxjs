<template>
    <div>
        <v-text-field
            name="user-name"
            :label="$t('clickingExample.userName')"
            id="user-name"
            :value="userName"
            @change="userNameChanged($event)"
        ></v-text-field>
    </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({components: {}, directives: {}})
export default class UserNameBar extends Vue {

    @Prop() userName: string;

    userNameChanged(userName: string) {
        this.$emit('userNameChanged', userName);
    }
    
}
</script>

<style lang="scss" scoped>
    @import '~styles/variables'; //tilde to resolve 'like a module'
</style>
