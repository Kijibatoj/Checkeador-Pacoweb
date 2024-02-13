package com.CheckOutPACO.vista;

import javax.swing.*;
import javax.swing.table.DefaultTableModel;

import com.CheckOutPACO.SQL.Paco_A;

import java.awt.*;
import java.sql.Statement;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.sql.Connection;
import java.sql.ResultSet;
import java.util.concurrent.TimeUnit;


public class Licencia extends javax.swing.JFrame{
  
  /**
	 * 
	 */
	Paco_A connet2 = new Paco_A();
	Connection con2 = connet2.getConnection();
	
private JLabel label1, label2;
  private JCheckBox check1;
  private JButton boton1, boton2;
  private JScrollPane scrollpane1;
  private JTextArea textarea1;
  
  String nombre = "";


	DefaultTableModel modelo;
	

  public Licencia(){
	  
    setLayout(null);
    load();
   
    setDefaultCloseOperation(EXIT_ON_CLOSE);
    setTitle("CHECKOUTPACO");
   
    setIconImage(new ImageIcon(getClass().getResource("imggrec.jpg")).getImage());
    
    cmbPortList = new javax.swing.JComboBox();
	dtm = new javax.swing.table.DefaultTableModel();
	table = new javax.swing.JTable();
	scrollPane = new javax.swing.JScrollPane();
    
	 
	    

    String[] columnNames = {"N° factura", "CAJA","FECHA_REGISTRO"};
   	Object[][] datos = {/*{"Juan",25,"false"},{"Juanito",35,"false"},{"Juana",45,"false"}*/};
   	
    dtm = new DefaultTableModel(datos, columnNames);
	table = new JTable(dtm);
    
    table.setPreferredScrollableViewportSize(new Dimension(600, 400));
	scrollPane = new JScrollPane(table);
	getContentPane().add(scrollPane, BorderLayout.CENTER);


  }
  

void load() {
	 
	
	try{
		DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd");
		DateTimeFormatter dta = DateTimeFormatter.ofPattern("HH:mm:ss");
		String fch = dtf.format(LocalDateTime.now());
		String hra = dta.format(LocalDateTime.now());
		
		Statement stmsdat = con2.createStatement();
		String ConSQLdat = "SELECT * FROM [dbo].[check_out_pacoweb] WHERE [fech_ent] = '"+fch+"T00:00:00' ";
		ResultSet rs = stmsdat.executeQuery(ConSQLdat);
		
		Object[] ObjecRow = new Object[5];
		if(rs.next()) {
		while(rs.next()){
			
			ObjecRow[0] = rs.getInt("fact_num");
			ObjecRow[1] = rs.getString("co_ven");
			ObjecRow[2] = rs.getString("fech_reg");
			
			
			dtm.addRow(ObjecRow);
			System.out.print(ObjecRow[0]);
			System.out.print(ObjecRow[1]);
			System.out.print(ObjecRow[2] + "\n");
	
		}
		
		}
		table.setModel(dtm);
	}catch(Exception e){
	
	}
	
}



  public static void main(String args[]) throws InterruptedException{
    Licencia ventanalicencia = new Licencia();
    //ventanalicencia.setUndecorated(true);
    ventanalicencia.pack();
    ventanalicencia.setVisible(true);
    

    while(true){
    	 ventanalicencia.load();
		 TimeUnit.SECONDS.sleep(2);
		
		}
  }
  
  private javax.swing.table.DefaultTableModel dtm ;
	 private javax.swing.JTable table ;
	 private javax.swing.JScrollPane scrollPane;
	private int rs2;
	private int rs3;
	private javax.swing.JComboBox cmbPortList;


  
}