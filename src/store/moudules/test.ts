import { MutationTree, GetterTree } from 'vuex';
import { Commit, ActionTree } from 'vuex';
import { getApiFetchOptions } from '../../nmb/util';
import { apiFetchAction } from '../apiUtil';

// 如果是api请求，后缀固定为_REQUEST、 _SUCCESS、_FAILED三种
const GET_DEMAND_LIST_REQUEST = 'GET_DEMAND_LIST_REQUEST';
const GET_DEMAND_LIST_SUCCESS = 'GET_DEMAND_LIST_SUCCESS';
const GET_DEMAND_LIST_FAILED = 'GET_DEMAND_LIST_FAILED';

const GET_TASK = 'GET_TASK';

// 如果是api请求, 后缀必须是Api
const getAllDemandApi = async (context: { commit: Commit, state: IState }, payload: any) => {
    apiFetchAction(context.commit, `demand/getAllDemand`, 'POST', {
        request: GET_DEMAND_LIST_REQUEST,
        success: GET_DEMAND_LIST_SUCCESS,
        failed: GET_DEMAND_LIST_FAILED
    }, payload);
};

// 普通调用action
const geTask = (context: { commit: Commit, state: IState }, payload: any) => {
    context.commit(GET_TASK, payload);
};

const actions: ActionTree<IState, any> = {
    getAllDemandApi,
    geTask
};

// 此处定义state类型
export interface IState {
    demandLoading: boolean;
    alldemand: any[];
    taskList: any[];
}

const initState: IState = {
    demandLoading: false,
    alldemand: [],
    taskList: []
};

const getters: GetterTree<IState, any> = {
    demandLoading: (state: IState) => state.demandLoading,
    alldemand: (state: IState) => state.alldemand,
    taskList: (state: IState) => state.taskList
};

const mutations: MutationTree<any> = {
    [GET_DEMAND_LIST_REQUEST](state: IState, payload) {
        state.demandLoading = true;
    },
    [GET_DEMAND_LIST_FAILED](state: IState, payload) {
        state.demandLoading = false;
    },
    [GET_DEMAND_LIST_SUCCESS](state: IState, payload) {
        state.demandLoading = false;
        state.alldemand = payload.data.alldemand;
    },

    [GET_TASK](state: IState, data) {
       state.taskList.push(data);
    }
};

export default {
    state: initState,
    getters,
    actions,
    mutations
};
