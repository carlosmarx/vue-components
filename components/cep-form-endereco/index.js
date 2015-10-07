Vue.component('cep-form-endereco',{

  template: '<div class="row"> <div class="col-md-4"> <div class="form-group"> <label for="inputCep">CEP:</label> <input type="text"  class="form-control" id="inputCep" v-model="cep" v-on="keyup:buscarCep" v-el="cep" /> </div> </div> </div> <p class="btn btn-danger disabled" v-show="naoLocalizado"  style="opacity: 1; margin:0 0 10px 0; display:none">CEP não localizado. Favor inserir manualmente!</p> <div class="row"> <div class="col-md-5"> <div class="form-group"> <label for="inputLogradouro">Logradouro:</label> <input type="text" class="form-control" id="inputLogradouro" v-model="endereco.logradouro" v-el="logradouro" /> </div> </div> <div class="col-md-2"> <div class="form-group"> <label for="inputNumero">Número:</label> <input type="text" class="form-control" id="inputNumero" v-el="numero" /> </div> </div> <div class="col-md-5"> <div class="form-group"> <label for="inputComplemento">Complemento:</label> <input type="text" class="form-control" id="inputComplemento" v-model="endereco.complemento" /> </div> </div> </div> <!-- End row --> <div class="row"> <div class="col-md-5"> <div class="form-group"> <label for="inputBairro">Bairro:</label> <input type="text" class="form-control" id="inputBairro" v-model="endereco.bairro" /> </div> </div> <div class="col-md-5"> <div class="form-group"> <label for="inputCidade">Cidade:</label> <input type="text" class="form-control" id="inputCidade" v-model="endereco.localidade" /> </div> </div> <div class="col-md-2"> <div class="form-group"> <label for="inputEstado">Estado:</label> <input type="text" class="form-control" id="inputEstado" v-model="endereco.uf" /> </div> </div> </div> <!-- End row -->',

  data: function()
  {
    return {
      cep: '',
        endereco: {},
        naoLocalizado: false
    }
  },

  attached: function()
  {
    jQuery(this.$$.cep).mask('00000-000');
  },

  methods: {
    buscarCep: function()
    {
      var self = this;

      self.endereco = {
        logradouro: '',
        localidade: '',
        complemento: '',
        bairro: '',
        uf: ''
      };
      self.naoLocalizado = false;

      if(/^[0-9]{5}-[0-9]{3}$/.test(self.cep))
      {
        jQuery.getJSON('http://viacep.com.br/ws/'+self.cep+'/json/', function(response) {

          if(response.erro){
            jQuery(self.$$.logradouro).focus();
            self.naoLocalizado = true;
            return false;
          }
          
          self.$set('endereco', response);
          self.naoLocalizado = false;
          jQuery(self.$$.numero).focus();
          
        });
      } //End if
    } //End of buscarCep
  } //End of methods
});