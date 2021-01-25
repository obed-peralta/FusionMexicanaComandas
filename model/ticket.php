<?php
    include ('ticket_general.php');
    //Captura Datos
    $pagar = $_GET['pagar'];
    $tipo = $_GET['tipo'];
    $id_comanda = $_GET['id_comanda'];
    $id_mesa = $_GET['id_mesa'];
    $numero_personas = $_GET['numero_personas'];
    $platillos = json_decode($_GET['platillos']);
    $platillosLength = count($platillos);
    $total = 0;
    //Formato Datos
    $pdf = new PDF();
    $pdf->AddPage('P','Letter');
    $pdf->SetFont('Arial','I',10);
    $pdf->Cell(47,5,'Comanda: '.$id_comanda,0,1,'L');
    $pdf->Cell(47,5,'Mesero: '.$id_mesa,0,1,'L');
    $pdf->Cell(47,5,'Mesa: '.$id_mesa,0,1,'L');
    $pdf->Cell(47,5,'Personas: '.$numero_personas,0,1,'L');
    $pdf->SetFont('Arial','B',11);
    $pdf->Cell(47,10,'Descripcion',0,0,'C');
    $pdf->Cell(47,10,'Precio',0,0,'C');
    $pdf->Cell(47,10,'Cantidad',0,0,'C');
    $pdf->Cell(47,10,'SubTotal',0,0,'C');
    $pdf->SetFont('Arial','',11);
    for ($i=0; $i < $platillosLength; $i++) { 
        $pdf->Ln(10);
        $pdf->Cell(47,5,$platillos[$i][1],0,0,'C');
        $pdf->Cell(47,5,$platillos[$i][2],0,0,'C');
        $pdf->Cell(47,5,$platillos[$i][3],0,0,'C');
        $pdf->Cell(47,5,'$'.($platillos[$i][2]*$platillos[$i][3]),0,0,'C');
        $total += ($platillos[$i][2]*$platillos[$i][3]);
    }
    $pdf->Ln(10);
    $pdf->SetFont('Arial','B',9);
    $pdf->Cell(47);
    $pdf->Cell(47);
    $pdf->Cell(47,10,'Total:',0,0,'R');
    $pdf->Cell(47,10,'$'.$total,0,0,'C');
    $pdf->Ln(5);
    $pdf->SetFont('Arial','B',9);
    $pdf->Cell(47);
    $pdf->Cell(47);
    $pdf->Cell(47,10,'Pago:',0,0,'R');
    $pdf->Cell(47,10,$pagar,0,0,'C');
    $pdf->Ln(5);
    $pdf->SetFont('Arial','B',9);
    $pdf->Cell(47);
    $pdf->Cell(47);
    $pdf->Cell(47,10,'Tipo de Pago:',0,0,'R');
    $pdf->Cell(47,10,$tipo,0,0,'C');
    $pdf->Ln(5);
    $pdf->SetFont('Arial','B',9);
    $pdf->Cell(47);
    $pdf->Cell(47);
    $pdf->Cell(47,10,'Cambio:',0,0,'R');
    $pdf->Cell(47,10,'$'.($pagar-$total),0,0,'C');
    $pdf->Ln(5);
    $pdf->Output();
?>
