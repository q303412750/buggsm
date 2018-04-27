import Vue from 'vue';
import Vuex, { ActionTree, MutationTree, Action, Store, MutationPayload } from 'vuex';
import test from './moudules/test';
import middlewarePlugin from '../nmb/middleware';

Vue.use(Vuex);

const strict = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
    modules: {
        test
    },
    strict: process.env.NODE_ENV !== 'production',
    plugins: [middlewarePlugin]
});
