import { Store } from '@/store/vuex'

declare module '@vue/runtime-core' {
    // declare your own index states
    interface State {
        count: number
    }

    // provide typings for `this.$index`
    interface ComponentCustomProperties {
        $store: Store<State>
    }
}