var rodada = 1;
var matriz_jogo = Array(3);
matriz_jogo['a'] = Array(3);
matriz_jogo['b'] = Array(3);
matriz_jogo['c'] = Array(3);

matriz_jogo['a'][1] = 0;
matriz_jogo['a'][2] = 0;
matriz_jogo['a'][3] = 0;

matriz_jogo['b'][1] = 0;
matriz_jogo['b'][2] = 0;
matriz_jogo['b'][3] = 0;

matriz_jogo['c'][1] = 0;
matriz_jogo['c'][2] = 0;
matriz_jogo['c'][3] = 0;



$(document).ready(function(){

	$('#btn-iniciar-jogo').click(function(){
		//valida a digitação dos apelidos dos jogadores
		if($('#entrada-apelido-jogador-1').val() == ''){
			alert('Apelido do jogador 1 não foi preenchido');
			return false;
		}
		if($('#entrada-apelido-jogador-2').val() == ''){
			alert('Apelido do jogador 2 não foi preenchido');
			return false;
		}

		//exibir os apelidos na tela do jogo
		$('#nome-jogador-1').html($('#entrada-apelido-jogador-1').val());
		$('#nome-jogador-2').html($('#entrada-apelido-jogador-2').val());
		
		// controla a visualização das divs
		$('#pagina-inicial').hide();
		$('#palco-jogo').show();

	});

	$('.jogada').click(function(){

		var id_campo_clicado = this.id;
		$('#'+id_campo_clicado).off();
		jogada(id_campo_clicado);

	});

	function jogada(id){
		var icone = '';
		var ponto = 0 ;

		if(rodada % 2 == 1){
			icone = 'url("imagens/marcacao_1.png")';
			ponto  = -1;
		} else {
			icone = 'url("imagens/marcacao_2.png")';
			ponto = 1;
		}

		rodada++;
		$('#'+id).css('background-image',icone);
		var linha_coluna = id.split('-');

		matriz_jogo[linha_coluna[0]][linha_coluna[1]] = ponto;

		verifica_combinacao();

	}

	function verifica_combinacao(){
		var pontos = 0;
		
		//verifica na horizontal
		for(var i = 1; i <= 3; i++){
			pontos = pontos + matriz_jogo['a'][i];
		}
		ganhador(pontos);
		

		pontos = 0;
		for(var i = 1; i <= 3; i++){
			pontos = pontos + matriz_jogo['b'][i];
		}
		ganhador(pontos);
		

		pontos = 0;
		for(var i = 1; i <= 3; i++){
			pontos = pontos + matriz_jogo['c'][i];
		}
		ganhador(pontos);
		

		//verifica na vertical
		
		for(var l = 1; l <= 3; l++){
			pontos = 0;
			pontos += matriz_jogo['a'][l];
			pontos += matriz_jogo['b'][l];
			pontos += matriz_jogo['c'][l];

			ganhador(pontos);
			
		}

		//verificar na diagonal
		pontos = 0;
		pontos = matriz_jogo['a'][1] + matriz_jogo['b'][2] + matriz_jogo['c'][3];
		ganhador(pontos);
		

		pontos = 0;
		pontos = matriz_jogo['a'][3] + matriz_jogo['b'][2] + matriz_jogo['c'][1];
		ganhador(pontos);
		

		if(rodada == 10 && pontos != -3 && pontos != 3){
			alert('Deu Velha, Ninguem Ganhou !!!');
			$('#vencedor-1').html('<h3 >Empate</h3><img src="imagens/velha1.jpg"  height="70"/><br />');
			$('#vencedor-2').html('<h3 >Empate</h3><img src="imagens/velha2.jpg" height="70"/><br />');
			$('.jogada').off();
			$('#btn-novo-jogo').show();
			return null;
		}

		
	}

	

	function ganhador(pontos){
		if(pontos == -3){
			var jogada_1 = $('#entrada-apelido-jogador-1').val();
			alert(jogada_1 + ' é o Vencedor');
			$('#vencedor-1').html('<h3 style="margin:-5px;">vencedor</h3><img src="imagens/trofeu.jpg"  height="70"/>');
			$('.jogada').off();
			$('#btn-novo-jogo').show();
		}else if(pontos == 3){
			var jogada_2 = $('#entrada-apelido-jogador-2').val();
			alert(jogada_2 +' é o Vencedor');
			$('#vencedor-2').html('<h3 style="margin:-5px;">vencedor</h3><img src="imagens/trofeu.jpg" height="70"/>');
			$('.jogada').off();
			$('#btn-novo-jogo').show();
		}

		
	}

	
		$('#btn-novo-jogo').click(function(){
			
			window.location.href = "index.html";

		})
	


});