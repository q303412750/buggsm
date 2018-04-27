import Vue from 'vue';
import Component from 'vue-class-component';
import { State, Action, Getter } from 'vuex-class';
import rely from '../oauth2rely';
import app from '../../app';

@Component({
  template: '<div><p>登录信息处理中</p><p>请稍候</p></div>'
})
export default class Callback extends Vue {

  beforeMount() {
    const authResult = rely.resolveAuthCallback();

    // 请求token
    if (authResult && authResult.result) {
      rely.token(authResult.code, this.tokenSuccess, this.error);
    } else {
      this.error(authResult.error);
    }
  }

  error = (err: any) => {
    app.showError(err);
  }

  tokenSuccess = (access_token: string) => {
    rely.userInfo(access_token, this.userInfoSuccess, this.error);
  }

  userInfoSuccess = () => {
    rely.returnToRedirectUrl();
  }
}
