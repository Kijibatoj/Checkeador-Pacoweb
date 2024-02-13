package com.CheckOutPACO.SQL;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;



public class Paco_A{
	public Connection connet2;

	public Paco_A() {
		try {
			
    	System.setProperty("java.net.preferIPv2Addresses", "true");

        // Create a variable for the connection string.
    	
        String connectionUrl = "jdbc:sqlserver://192.168.1.109:1433"
        		+ ";database=LQIP_A;"
        		+ "user=profit;"
        		+ "password=profit;"
        		+ "encrypt=false;"
        		+ "trustServerCertificate=true;"
        		+ "loginTimeout=30;";
        		//+ "encrypt=false;"
        	   // +"trustServerCertificate=true;"
        		//+ "user=profit;"
        		
        		//+"hostNameInCertificate=SERVER-APP;";
        
       // System.out.print("CONEXION CON EL SERVIDOR EXITOSA : SERVER-APP\n");
       
         connet2 = DriverManager.getConnection(connectionUrl);
    	
         
        }
        // Handle any errors that may have occurred.
        catch (Exception e) {
            e.printStackTrace();
            System.out.print("\n ERROR : NO SE CONSIGUE EL HOST : Conexion a PACO_A " + e );
        }
	}

	public Connection  getConnection() {
		return connet2;
	}

}

