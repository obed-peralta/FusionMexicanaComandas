<?php
	require 'fpdf/fpdf.php';
	class PDF extends FPDF
	{
		function Header()
		{
			$this->Image('../icons/FusionMexicana.jpg',5,5,30);
			$this->SetFont('Arial','B',15);
			$this->Image('../icons/FusionMexicana.jpg',175,5,30);
			$this->Cell(30);
			$this->Cell(130,10,'Fusion Mexicana',0,1,'C');
			$this->Cell(30);
			$this->Cell(130,10,'COMANDA',0,1,'C');
			$this->Cell(30);
			$this->SetFont('Arial','I',8);
			$this->Cell(130,10,' Privada Lazaro Cardenas 4- C, Eusebio Jauregui, 62749 Cuautla, Morelos. Copyright: CADE Co.',0,1,'C');
			$this->Ln(20);
		}
		function Footer()
		{
			$this->SetY(-15);
			$this->SetFont('Arial','I',8);
			$this->Cell(30);
			$this->Cell(130,10,'GRACIAS POR SU COMPRA. Agradecemos su preferencia.',0,1,'C');
		}
	}
?>