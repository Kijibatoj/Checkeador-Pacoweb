package com.CheckOutPACO;

import java.sql.ResultSet;
import java.sql.Statement;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.concurrent.TimeUnit;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.CheckOutPACO.vista.ImprimeFactura;
import com.CheckOutPACO.vista.Licencia;

@SpringBootApplication
public class ChekcOutPacoApplication extends javax.swing.JFrame{


	private static final long serialVersionUID = 1L;
	

	public static void main(String[] args) throws InterruptedException {
		SpringApplication.run(ChekcOutPacoApplication.class, args);
		/*ImprimeFactura frame = new ImprimeFactura();*/
		/*frame.setUndecorated(true);
		frame.pack();
		frame.setVisible(true);
		frame.setBounds(0,0,600,400);
		
		while (true) {
			frame.load();
			
			TimeUnit.SECONDS.sleep(3600);

		}*/
	
		
		
	}

}
