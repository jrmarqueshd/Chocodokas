<?php
// Declara array para armazenar erros
$error = array();
// Locate Infos
$locate_info = array();
$locate_info = unserialize(file_get_contents('http://www.geoplugin.net/php.gp?ip='.$_SERVER['REMOTE_ADDR']));
// Informações do Browser
$browser = getBrowser();
// Nome
$nome = $_POST['name'];
filter_var($nome, FILTER_SANITIZE_STRING);
// E-mail
$email = $_POST['email'];
filter_var($email, FILTER_VALIDATE_EMAIL);
// Telefone
$telefone = $_POST['telphone'];
filter_var($telefone, FILTER_SANITIZE_STRING);
/*$data_envio = date('d/m/Y');
$hora_envio = date('H:i:s');*/
//
$fuso = new DateTimeZone( 'America/Sao_Paulo' );
$data = new DateTime( 'now' );
$data->setTimezone( $fuso );
$data_envio = $data->format('d/m/Y H:i:s');
// E-mail
$arquivo = "
	<style type='text/css'>
	body {
		margin:0px;
		font-family:Verdana;
		font-size:12px;
		color: #666666;
	}
	a{
		color: #BC171B;
		text-decoration: none;
	}
	a:hover {
		color: #FF0000;
		text-decoration: none;
	}
	</style>
    <html>
    	<div>
			<h1>Informações do Contato</h1>
    		<div><strong>Nome:</strong> " . ucfirst( $nome ) . "</div>
    		<div><strong>E-mail:</strong> $email</div>
    		<div><strong>WhatsApp:</strong> $telefone</div>
    		<br>
    		<hr>
    		<h2>Outras Informações:</h2>
			<div><strong>Data/Horário:</strong> " . $data_envio . "</div>
    		</div>
    		<div><strong>Device:</strong> " . chocodokas_mobile() . "</div>
    	</div>
	</html>
";
// Envio
   
  $emailenviar = 'Junior <jrmarqueshd@gmail.com>';
  $destino = $emailenviar;
  $assunto = "Chocodokas recebeu um novo Lead Landing Page - " . $data_envio;
 
  // É necessário indicar que o formato do e-mail é html
  $headers  = 'MIME-Version: 1.0' . "\r\n";
      $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
      $headers .= 'From: ' . $nome . ' <contato@chocodokas.com.br>' . "\r\n";
      $headers .= 'Bcc: Junior Marques <jr.info@hotmail.com.br>' . "\r\n";
      $headers .= 'Reply-to: <' . $email . '>';
  //$headers .= "Bcc: $EmailPadrao\r\n";
   
$enviaremail = mail( $destino, $assunto, $arquivo, $headers );
if( $enviaremail ){
	/*$mgm = "E-MAIL ENVIADO COM SUCESSO! <br> O link será enviado para o e-mail fornecido no formulário";*/
	echo "<meta http-equiv='refresh' content='0;URL=http://www.google.com.br/'>";
} else {
	/*$mgm = "ERRO AO ENVIAR E-MAIL!";*/
	echo "";
}
// Device Detect
function chocodokas_mobile() {
	$detect = new Mobile_Detect;
	if ( is_object( $detect ) && $detect->isMobile() ) {
		return 'Mobile';
	} elseif( is_object( $detect ) && $detect->isTablet() ) {
		return 'Tablet';
	} else {
		return 'Desktop';
	}
}