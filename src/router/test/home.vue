<template>
  <div class="hello">
    <FnNavBar />
    	<Tabs></Tabs>   
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import Component from 'vue-class-component';
import { Getter, Action } from 'vuex-class';
import FnNavBar from '../../nmb/components/FnNavBar.vue';
import Tabs from '../test/Tabs.vue';
@Component({
  components: { FnNavBar , Tabs}
})
export default class Home extends Vue {

}
</script>
<style type="text/css">
	.hello{
		font-family: PingFangSC ;
	}
</style>