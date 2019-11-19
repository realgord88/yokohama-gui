<template>
<div class="single-product-tab-area mg-b-30">
    <div class="single-pro-review-area">
        <div class="container-fluid">
            <div class="row">
                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <div class="review-tab-pro-inner">
                        <ul class="tab-review-design">
                            <button type="button" v-on:click="get_info" class="btn btn-ctl-bt btn-info "> Info </button>
                            <button type="button" v-on:click="get_metrics" class="btn btn-ctl-bt btn-info "> Metrics </button>
                            <button type="button" v-on:click="set_lenght" class="btn btn-ctl-bt btn-info "> Set lenght </button>
                            <button type="button" v-on:click="set_averaging" class="btn btn-ctl-bt btn-info "> Set average </button>
                            <button type="button" v-on:click="info_slots" class="btn btn-ctl-bt btn-info "> Slots info </button>
                            <button type="button" v-on:click="set_date" class="btn btn-ctl-bt btn-info "> Set date </button>
                            <button type="button" v-on:click="set_time" class="btn btn-ctl-bt btn-info "> Set time </button>
                            <button type="button" v-on:click="set_offset" class="btn btn-ctl-bt btn-info "> Set offset </button>
                            <button type="button" v-on:click="check_errors" class="btn btn-ctl-bt btn-info "> Check errors </button>
                            <template v-if="connect_status=='error' || connect_status=='disconnected'">
                                                <button type="button" v-on:click="connect" class="btn  btn-success waves-effect ">
                                                    <template v-if="connect_status=='error' || connect_status=='disconnected'">
                                                        Connect
                                                    </template>
                                                    <template v-else="connect_status=='connected'">
                                                        Disconnect
                                                    </template>
                                                </button>
                                            </template>
                                            <template v-else="connect_status=='connected'">
                                                <button type="button" v-on:click="disconnect" class="btn  btn-success waves-effect ">
                                                    <template v-if="connect_status=='error' || connect_status=='disconnected'">
                                                        Connect
                                                    </template>
                                                    <template v-else="connect_status=='connected'">
                                                        Disconnect
                                                    </template>
                                                </button>
                                            </template>
                        </ul>
                        <div id="myTabContent" class="tab-content custom-product-edit">
                            <div class="product-tab-list tab-pane fade active in" id="description">
                                <div class="row">
                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <div class="review-content-section">
                                            <div class="input-group mg-b-pro-edt">
                                                <span class="input-group-addon"><i class="icon nalika-user" aria-hidden="true"></i></span>
                                                <input type="text" ref="ip" class="form-control" placeholder="IP">
                                            </div>
                                            <div class="input-group mg-b-pro-edt">
                                                <span class="input-group-addon"><i class="icon nalika-edit" aria-hidden="true"></i></span>
                                                <input type="text" ref="average" class="form-control" placeholder="Average">
                                            </div>
                                            <div class="input-group mg-b-pro-edt">
                                                <span class="input-group-addon"><i class="fa fa-usd" aria-hidden="true"></i></span>
                                                <input type="text" ref="date" class="form-control" placeholder="Date">
                                            </div>
                                            <div class="input-group mg-b-pro-edt">
                                                <span class="input-group-addon"><i class="icon nalika-new-file" aria-hidden="true"></i></span>
                                                <input type="text" ref="offset" class="form-control" placeholder="Offset">
                                            </div>
                                            <div class="input-group mg-b-pro-edt">
                                                <span class="input-group-addon"><i class="icon nalika-new-file" aria-hidden="true"></i></span>
                                                <input type="text" ref="reference_value_up" class="form-control" placeholder="Reference value up">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                                        <div class="review-content-section">
                                            <div class="input-group mg-b-pro-edt">
                                                <span class="input-group-addon"><i class="icon nalika-user" aria-hidden="true"></i></span>
                                                <input type="text" ref="port" class="form-control" placeholder="Port">
                                            </div>
                                            <div class="input-group mg-b-pro-edt">
                                                <span class="input-group-addon"><i class="icon nalika-favorites-button" aria-hidden="true"></i></span>
                                                <input type="text" ref="lenght" class="form-control" placeholder="Lenght">
                                            </div>
                                            <div class="input-group mg-b-pro-edt">
                                                <span class="input-group-addon"><i class="fa fa-usd" aria-hidden="true"></i></span>
                                                <input type="text" ref="time" class="form-control" placeholder="Time">
                                            </div>
                                            <div class="text-left custom-pro-edt-ds">
                                            <div class="input-group mg-b-pro-edt">
                                                <span class="input-group-addon"><i class="icon nalika-new-file" aria-hidden="true"></i></span>
                                                <input type="text" ref="reference_value" class="form-control" placeholder="Reference value">
                                            </div>
                                            <div class="input-group mg-b-pro-edt">
                                                <span class="input-group-addon"><i class="icon nalika-new-file" aria-hidden="true"></i></span>
                                                <input type="text" ref="reference_value_down" class="form-control" placeholder="Reference value down">
                                            </div>
                                            
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
<div class="main-box">
				<div class="box1">
                   <ul v-for="message in messages.slice().reverse()">
                       Message: {{ message }}
                    </ul>
				</div>
        </div>

</div>

				
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
import VueModalTor from 'vue-modaltor'
Vue.use(VueModalTor)

export const HTTP = axios.create({
  baseURL: 'http://localhost:8000/'
})

export default {
  name: 'panel',
  data () {
    return {
      responce_server: '',  
      messages: [],
      connect_status: 'error',
      alert: false
    };
  },
    methods: {
        connect: function () {
            this.ip = this.$refs.ip.value;
            this.port = this.$refs.port.value;
            var bodyFormData = new FormData();
            bodyFormData.set('ip', this.ip);
            bodyFormData.set('port', this.port);
            HTTP.post('api/connect/', bodyFormData, {headers: {'Content-Type': 'application/vnd.api+json'}})
            .then(response => (this.responce_server = response.data.status)
            .then(this.messages.push(this.responce_server)
            .then(this.connect_status=this.responce_server)));
        },

        disconnect: function () {
            HTTP.get('api/disconnect/')
            .then(response => (this.responce_server = response.data.status)
            .then(this.messages.push(this.responce_server)
            .then(this.connect_status=this.responce_server)));
        },

        get_info: function () {
            HTTP.get('api/info/')
            .then(response => (this.responce_server = response.data.data)
            .then(this.messages.push(this.responce_server)));
        },

        get_metrics: function () {
            HTTP.get('api/metrics/')
            .then(response => (this.responce_server = response.data.data)
            .then(this.messages.push(this.responce_server)));
            console.log(this.responce_server);
            var today = new Date();
            var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate()+'T'+today.getHours()+':'+today.getMinutes()+':'+today.getSeconds()+'Z';
            this.reference_value = Number(this.$refs.reference_value.value);
            this.reference_value_up = this.reference_value + Number(this.$refs.reference_value_up.value);
            this.reference_value_down = this.reference_value - Number(this.$refs.reference_value_down.value);
            if (this.responce_server<this.reference_value_down || this.responce_server>this.reference_value_up){
                alert('Alert');
                this.alert=true;
            }
            else{
                this.alert=false;
            }
            HTTP.post('api/addmetric/', {"data_metrics": {"metric" : this.responce_server, "reference": this.reference_value, "alert": this.alert, "date_metric": date}})
        },

        set_lenght: function () {
            this.lenght = this.$refs.lenght.value;
            var bodyFormData = new FormData();
            bodyFormData.set('lenght', this.lenght);
            HTTP.post('api/setlenght/', bodyFormData, {headers: {'Content-Type': 'application/vnd.api+json'}})
            .then(response => (this.responce_server = response.data.data)
            .then(this.messages.push(this.responce_server)));
        },

        set_averaging: function () {
            this.average = this.$refs.average.value;
            var bodyFormData = new FormData();
            bodyFormData.set('average', this.average);
            HTTP.post('api/setaveraging/', bodyFormData, {headers: {'Content-Type': 'application/vnd.api+json'}})
            .then(response => (this.responce_server = response.data.data)
            .then(this.messages.push(this.responce_server)));
        },

        info_slots: function () {
            HTTP.get('api/infoslots/')
            .then(response => (this.responce_server = response.data.data)
            .then(this.messages.push(this.responce_server)));
        },

        set_date: function () {
            this.date = this.$refs.date.value;
            var bodyFormData = new FormData();
            bodyFormData.set('date', this.date);
            HTTP.post('api/setdate/', bodyFormData, {headers: {'Content-Type': 'application/vnd.api+json'}})
            .then(response => (this.responce_server = response.data.data)
            .then(this.messages.push(this.responce_server)));
        },

        set_time: function () {
            this.time = this.$refs.time.value;
            var bodyFormData = new FormData();
            bodyFormData.set('time', this.time);
            HTTP.post('api/settime/', bodyFormData, {headers: {'Content-Type': 'application/vnd.api+json'}})
            .then(response => (this.responce_server = response.data.data)
            .then(this.messages.push(this.responce_server)));
        },

        set_offset: function () {
            this.offset = this.$refs.offset.value;
            var bodyFormData = new FormData();
            bodyFormData.set('db', this.offset);
            HTTP.post('api/setoffset/', bodyFormData, {headers: {'Content-Type': 'application/vnd.api+json'}})
            .then(response => (this.responce_server = response.data.data)
            .then(this.messages.push(this.responce_server)));
        },

        check_errors: function () {
            HTTP.get('api/errors/')
            .then(response => (this.responce_server = response.data.data)
            .then(this.messages.push(this.responce_server)));
        },

        
   }
}
</script>