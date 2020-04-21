var calculadora = {

	visor: document.getElementById("display"),
	valorVisor: "0",
	operacion: "",
	primerValor: 0,
	segundoValor: 0,
	ultimoValor: 0,
	resultado: 0,
	auxTeclaIgual: false,

	init: (function(){
		this.eventosTecla(".tecla");
		this.eventosFuncion();
	}),

	//Eventos de formato de botones

	eventosTecla: function(selector){
		var x = document.querySelectorAll(selector);
		for (var i = 0; i<x.length;i++) {
			x[i].onmousedown = this.eventoAchicaBoton;
			x[i].onmouseup = this.eventoAumentaBoton;
		};
	},

	eventoAchicaBoton: function(event){
		calculadora.achicaBoton(event.target);
	},

	eventoAumentaBoton: function(event){
		calculadora.aumentaBoton(event.target);
	},

	//Formato de botones

	achicaBoton: function(elemento){
		var x = elemento.id;
    elemento.style.transform = "scale(0.9)";
	},

	aumentaBoton: function(elemento){
		var x = elemento.id;
    elemento.style.transform = "scale(1)";
	},

	eventosFuncion: function(){
		document.getElementById("0").addEventListener("click", function() {calculadora.ingresoNumero("0");});
		document.getElementById("1").addEventListener("click", function() {calculadora.ingresoNumero("1");});
		document.getElementById("2").addEventListener("click", function() {calculadora.ingresoNumero("2");});
		document.getElementById("3").addEventListener("click", function() {calculadora.ingresoNumero("3");});
		document.getElementById("4").addEventListener("click", function() {calculadora.ingresoNumero("4");});
		document.getElementById("5").addEventListener("click", function() {calculadora.ingresoNumero("5");});
		document.getElementById("6").addEventListener("click", function() {calculadora.ingresoNumero("6");});
		document.getElementById("7").addEventListener("click", function() {calculadora.ingresoNumero("7");});
		document.getElementById("8").addEventListener("click", function() {calculadora.ingresoNumero("8");});
		document.getElementById("9").addEventListener("click", function() {calculadora.ingresoNumero("9");});
		document.getElementById("on").addEventListener("click", function() {calculadora.borrarVisor();});
		document.getElementById("sign").addEventListener("click", function() {calculadora.cambiarSigno();});
		document.getElementById("punto").addEventListener("click", function() {calculadora.ingresoDecimal();});
		document.getElementById("igual").addEventListener("click", function() {calculadora.verResultado();});
		document.getElementById("raiz").addEventListener("click", function() {calculadora.ingresoOperacionRaiz("raiz");});
		document.getElementById("dividido").addEventListener("click", function() {calculadora.ingresoOperacion("/");});
		document.getElementById("por").addEventListener("click", function() {calculadora.ingresoOperacion("*");});
		document.getElementById("menos").addEventListener("click", function() {calculadora.ingresoOperacion("-");});
		document.getElementById("mas").addEventListener("click", function() {calculadora.ingresoOperacion("+");});
	},

	borrarVisor: function(){

	    this.valorVisor = "0";
		this.operacion = "";
		this.primerValor = 0;
		this.segundoValor = 0;
		this.resultado = 0;
		this.Operación = "";
		this.auxTeclaIgual = false;
		this.ultimoValor = 0;
		this.updateVisor();
	},

	cambiarSigno: function(){
    var pantalla = new RegExp('[0-9]');
    var valor = this.valorVisor;
    var cadena = valor.length;
    var ultimoCaracter = valor.substr((cadena-1),1);
    //Validamos que la pantalla no tenga una operacion en curso o finalize en punto
    if (ultimoCaracter.match(pantalla)!=null){
  		if (valor != "0" && valor !="") {
  			var aux;
  			if (this.valorVisor.charAt(0)=="-") {
  				aux = this.valorVisor.slice(1);
  			}	else {
  				aux = "-" + this.valorVisor;
  			}
  		this.valorVisor = "";
  		this.valorVisor = aux;
  		this.updateVisor();
  		}
    }
	},

	ingresoDecimal: function(){
    var valor = this.valorVisor;
    var cadena = valor.length;
    var ultimoCaracter = valor.substr((cadena-1),1);
    var pantalla = new RegExp('[0-9]');
		if (ultimoCaracter != '.') {
      if (ultimoCaracter.match(pantalla)!=null){
  			if (this.valorVisor == ""){
  				this.valorVisor = this.valorVisor + "0.";
  			} else {
  				this.valorVisor = this.valorVisor + ".";
  			}
        this.updateVisor();
      }
		}
	},

	ingresoNumero: function(valor){
		if (this.valorVisor.length < 8) {
			if (this.valorVisor=="0") {
				this.valorVisor = "";
				this.valorVisor = this.valorVisor + valor;
			} else {
				this.valorVisor = this.valorVisor + valor;
			}
		this.updateVisor();
		}
	},

	ingresoOperacion: function(oper){
    var pantalla = new RegExp('[0-9]');
    var signos = new RegExp('^[0-9\-]+$|^[0-9\+]+$|^[0-9\/]+$|^[0-9\*]+$');
    var numeros = new RegExp('^[0-9]+$');
    var valor = this.valorVisor;
    var cadena = valor.length;
    var ultimoCaracter = valor.substr((cadena-1),1);
    //Validamos que el ultimo caracter no sea un punto
    if (ultimoCaracter != '.'){
      //Validamos que el ultimo caracter sea un numero
      if (ultimoCaracter.match(pantalla)!=null){
          this.operacion = oper;
          this.primerValor = parseFloat(this.valorVisor);
          this.valorVisor = valor + this.operacion;
          this.auxTeclaIgual = false;
      		this.updateVisor();
      }else{
          if (valor.indexOf('raiz') == -1){
            valor = valor.substr(0,(cadena-1));
            this.operacion = oper;
            this.primerValor = parseFloat(this.valorVisor);
            this.valorVisor = valor + this.operacion;
            this.auxTeclaIgual = false;
        		this.updateVisor();
          }else{
            valor = valor.substr(0,(cadena-4));
            this.operacion = oper;
            this.primerValor = parseFloat(this.valorVisor);
            this.valorVisor = valor + this.operacion;
            this.auxTeclaIgual = false;
        		this.updateVisor();
          }
      }
    }
	},

  ingresoOperacionRaiz: function(valor){
		var valor = this.valorVisor;
    var raiz = Math.sqrt(valor);
    if ((Math.sqrt(valor)).toString().length > 8){
      this.valorVisor = Math.sqrt(valor).toString().substr(0,8);
    }else{
      this.valorVisor = Math.sqrt(valor);
    }

		this.updateVisor();
	},

	verResultado: function(){
    var operacionVisor = (this.valorVisor).split(this.operacion);
		if(!this.auxTeclaIgual){
			this.segundoValor = parseFloat(operacionVisor[1]);
			this.ultimoValor = this.segundoValor;
			this.realizarOperacion(this.primerValor, this.segundoValor, this.operacion);

		} else {
			this.realizarOperacion(this.primerValor, this.ultimoValor, this.operacion);
		}

		this.primerValor = this.resultado;
		this.valorVisor = "";

		if (this.resultado.toString().length < 9){
			this.valorVisor = this.resultado.toString();
		} else {
			this.valorVisor = this.resultado.toString().slice(0,8) + "...";
		}

		this.auxTeclaIgual = true;
		this.updateVisor();

	},

	realizarOperacion: function(primerValor, segundoValor, operacion){
		switch(operacion){
			case "+":
				this.resultado = eval(primerValor + segundoValor);
			break;
			case "-":
				this.resultado = eval(primerValor - segundoValor);
			break;
			case "*":
				this.resultado = eval(primerValor * segundoValor);
			break;
			case "/":
				this.resultado = eval(primerValor / segundoValor);
			break;
		}
	},

	updateVisor: function(){
		this.visor.innerHTML = this.valorVisor;
	}

};

calculadora.init();
