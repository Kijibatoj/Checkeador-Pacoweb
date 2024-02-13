package com.CheckOutPACO.modelo;

import java.sql.Statement;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.sql.Connection;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.CheckOutPACO.SQL.Paco_A;
import com.CheckOutPACO.entity.CheckOutFactPACO;

public class CheckOutFactPACOModel {

	Paco_A connet2 = new Paco_A();
	Connection con2 = connet2.getConnection();

	public List<CheckOutFactPACO> findAll(String nfacCheck, String userCheck) {
		List<CheckOutFactPACO> checkoutpaco = new ArrayList<CheckOutFactPACO>();
		
		
		 String caja = "";
		 String cantidadTem = "";
		 String peso = "";
		 String montousd = "";
		 String montobs = "";
		 String cedula = "";
		 String nombrecli = "";
		 String checkoutfech = "";
		 String fec_emisID = "";
		 String ArtXpeso = "";
		 	double SumaVar = 0.0;
		 	double Varpeso01 = 0.0;
		 	double MultiPeso = 0.0;
			String token = "";
			String chatID = "";
			String fechaComparacion = "";

		 
		try {
			DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd");
			DateTimeFormatter dta = DateTimeFormatter.ofPattern("HH:mm:ss");
			String fch = dtf.format(LocalDateTime.now());
			String hra = dta.format(LocalDateTime.now());
			
			Statement stmsfact23s = con2.createStatement();
			String conSQLfact23s = "SELECT * FROM [dbo].[check_out_pacoweb] WHERE [fact_num] = '" + nfacCheck + "' ";
			ResultSet rsultfact23s = stmsfact23s.executeQuery(conSQLfact23s);
			
			
			 if (rsultfact23s.next() == true ) {
				 
				 String co_checks = rsultfact23s.getString("co_check");
				 String fec_reg = rsultfact23s.getString("fech_reg");
				 
				 Statement datafec = con2.createStatement();
				 String SQLdatafec = "SELECT * FROM [dbo].[factura] WHERE [fact_num] = '"+nfacCheck+"' ";
				 ResultSet datafacs = datafec.executeQuery(SQLdatafec);
	 
				 if(datafacs.next()) {
				 
					String datafac = datafacs.getString("fe_us_in");
					String co_cli = datafacs.getString("co_cli");
					String tot_neto = datafacs.getString("tot_neto");
					String co_venCaja = datafacs.getString("co_ven");
					String fec_emisCon = datafacs.getString("fe_us_in");
					double tasaMoneda = datafacs.getDouble("tasa");
					
					double tot_netoDouble = Double.valueOf(tot_neto);
					
					double tot_netoUSD = (tot_netoDouble / tasaMoneda);
					
					 caja = co_venCaja;
					 montousd = String.valueOf(tot_netoUSD);
					 montobs = tot_neto;
					 cedula = co_cli;
					 fec_emisID = fec_emisCon;
			
					String fchfacemis = String.valueOf(datafac);
					
					Statement stData01 = con2.createStatement();
					String ConSQLdata01 = "SELECT * FROM [dbo].[reng_fac] WHERE [fact_num] = '"+checkoutfech+"' ";
					ResultSet rsData01 = stData01.executeQuery(ConSQLdata01);
					
					if(rsData01.next() == true) {
						
					}
					
					
					Statement stData02 = con2.createStatement();
					String ConSQLdata02 = "SELECT * FROM [dbo].[clientes] WHERE [co_cli] = '"+co_cli+"' ";
					ResultSet rsData02 = stData02.executeQuery(ConSQLdata02);
					
					if(rsData02.next() == true) {
						String cli_des = rsData02.getString("cli_des");
						nombrecli = cli_des;
					}
					
					Statement stData03 = con2.createStatement();
					String conSQLdata03 = "SELECT SUM(total_art) AS total_art FROM [dbo].[reng_fac] WHERE [fact_num] = '"+nfacCheck+"' AND [uni_venta] != 'KG' ";
					ResultSet rsData03 = stData03.executeQuery(conSQLdata03);
					
					if(rsData03.next() == true) {
						String totalUni = rsData03.getString("total_art");
						cantidadTem = totalUni;
						
					}
					
					
					Statement stData04 = con2.createStatement();
					String conSQLdata04 = "SELECT SUM(total_art) AS total_art FROM [dbo].[reng_fac] WHERE [fact_num] = '"+nfacCheck+"' AND [uni_venta] = 'KG' ";
					ResultSet rsData04 = stData04.executeQuery(conSQLdata04);
					
					if(rsData04.next() == true) {
						String totalKg = rsData04.getString("total_art");
						peso = totalKg;
					}
					
					checkoutfech = fch+" "+hra;
					
					
					Statement stData07 = con2.createStatement();
					String conSQLdata07 = "SELECT * FROM reng_fac WHERE fact_num = '"+nfacCheck+"'AND uni_venta != 'KG'";
					ResultSet rsData07 = stData07.executeQuery(conSQLdata07);
				
						while(rsData07.next() == true) {
						String coart = rsData07.getString("co_art");
						double totalart = rsData07.getDouble("total_art");
						
						Statement stData08 = con2.createStatement();
						String conSQLdata08 = "SELECT * FROM art WHERE co_art = '"+coart+"'";
						ResultSet rsData08 = stData08.executeQuery(conSQLdata08);
						if(rsData08.next() == true) {
							
							Varpeso01 = rsData08.getDouble("peso");
							 
						}
						 MultiPeso = totalart * Varpeso01;
						 SumaVar = SumaVar + MultiPeso ;
					}
				 ArtXpeso = String.valueOf(SumaVar);
				
				Statement stData09 = con2.createStatement();
				String conSQLdata09 = "SELECT * FROM Bot";
				ResultSet rsData09 = stData09.executeQuery(conSQLdata09);
				
				if(rsData09.next()== true) {
					token = rsData09.getString("token_bot");
					chatID = rsData09.getString("id_chat");
					
				}
				
				
				fechaComparacion =fch;
				 checkoutpaco.add(new CheckOutFactPACO(nfacCheck , co_checks , fch, hra, "DUPLIC",nfacCheck,fchfacemis, fec_reg,caja,cantidadTem,peso,montousd,montobs,cedula,nombrecli,checkoutfech,fec_emisID,ArtXpeso, token,chatID,fechaComparacion));
				 
				 }
			}
			
		}catch(Exception e){
			System.out.print("\n ERROR : CHECKOUT DUPLIC  ");
		}
		
		try {
			DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd");
			DateTimeFormatter dta = DateTimeFormatter.ofPattern("HH:mm:ss");
			String fch = dtf.format(LocalDateTime.now());
			String hra = dta.format(LocalDateTime.now());
			
			

			Statement stmsfact = con2.createStatement();
			String conSQLfact = "SELECT * FROM [dbo].[factura] WHERE [fact_num] = '" + nfacCheck + "' ";
			ResultSet rsultfact = stmsfact.executeQuery(conSQLfact);

		
			if (rsultfact.next()) {
				
				String nfact = rsultfact.getString("fact_num");
				String co_vens = rsultfact.getString("co_ven");
				String co_user = rsultfact.getString("co_us_in");
				Date fec_emis = rsultfact.getDate("fec_emis");

					Statement stmsfact2 = con2.createStatement();
					String conSQLfact2 = "SELECT * FROM [dbo].[check_out_pacoweb] WHERE [fact_num] = '" + nfacCheck + "' ";
					ResultSet rsultfact2 = stmsfact2.executeQuery(conSQLfact2);

					if (rsultfact2.next() != true ) {
						
						Statement stmsinser = con2.createStatement();
						String conSQLinser = "INSERT INTO [dbo].[check_out_pacoweb] ([fact_num] , [co_ven] , [co_user] , [co_check] , [fech_ent] ,[fech_exit] , [fech_reg] ) "
								+ "VALUES ('" + nfact + "' , '" + co_vens + "' , '" + co_user + "' , '" + userCheck+ "' , '"+fec_emis+"T00:00:00' , '" + fch + "T00:00:00' , '" + fch + "T" + hra + "') ";
						stmsinser.executeUpdate(conSQLinser);
						
						
						Statement stmsfact253 = con2.createStatement();
						String conSQLfact253 = "SELECT COUNT(fact_num) AS fact_num FROM [dbo].[reng_fac] WHERE [fact_num] = '"+nfacCheck+"' ";
						ResultSet rsults = stmsfact253.executeQuery(conSQLfact253);
						
						Statement stmsfact254 = con2.createStatement();
						String conSQLfact254 = "SELECT * FROM [dbo].[factura] WHERE [fact_num] = '"+nfacCheck+"' ";
						ResultSet rsult4 = stmsfact254.executeQuery(conSQLfact254);
						
						Statement stmsfact255 = con2.createStatement();
						String conSQLfact255 = "SELECT SUM(total_art) AS total_art FROM [dbo].[reng_fac] WHERE [fact_num] = '"+nfacCheck+"' AND [uni_venta] = 'KG' ";
						ResultSet rsult5 = stmsfact255.executeQuery(conSQLfact255);
						
						Statement stmsfact256 = con2.createStatement();
						String conSQLdata256 = "SELECT * FROM Bot";
						ResultSet rsult6 = stmsfact256.executeQuery(conSQLdata256);
						
						Statement stmsfact257s = con2.createStatement();
						String conSQLfact257s = "SELECT * FROM [dbo].[check_out_pacoweb] WHERE [fact_num] = '" + nfacCheck + "' ";
						ResultSet rsultfact257s = stmsfact257s.executeQuery(conSQLfact257s);
						
						
							 
							
							 
							 
						 
					
						
						if(rsults.next() == true && rsult4.next() == true && rsult5.next() == true && rsult6.next()== true && rsultfact257s.next()==true) {
							
							String cantidaitem = rsults.getString("fact_num");
							String monto_net = rsult4.getString("tot_neto");
							String pesoprokg = rsult5.getString("total_art");
							String datafac = rsult4.getString("fe_us_in");
							String co_cli = rsult4.getString("co_cli");
							String tot_neto = rsult4.getString("tot_neto");
							String co_venCaja = rsult4.getString("co_ven");
							String fec_emisCon = rsult4.getString("fe_us_in");
							double tasaMoneda = rsult4.getDouble("tasa");
							
							String FechaEmil = rsult4.getString("fec_emis");
							
							
							Statement stData22 = con2.createStatement();
							String ConSQLdata22 = "SELECT * FROM [dbo].[clientes] WHERE [co_cli] = '"+co_cli+"' ";
							ResultSet rsData22 = stData22.executeQuery(ConSQLdata22);
							if(rsData22.next() == true) {
							String cli_des = rsData22.getString("cli_des");
							nombrecli = cli_des;
							}
							Statement stData07 = con2.createStatement();
							String conSQLdata07 = "SELECT * FROM reng_fac WHERE fact_num = '"+nfacCheck+"'AND uni_venta != 'KG'";
							ResultSet rsData07 = stData07.executeQuery(conSQLdata07);
						
								while(rsData07.next() == true) {
								String coart = rsData07.getString("co_art");
								double totalart = rsData07.getDouble("total_art");
								
							Statement stData08 = con2.createStatement();
							String conSQLdata08 = "SELECT * FROM art WHERE co_art = '"+coart+"'";
							ResultSet rsData08 = stData08.executeQuery(conSQLdata08);
							if(rsData08.next() == true) {
								
								Varpeso01 = rsData08.getDouble("peso");
								 
							}
							 MultiPeso = totalart * Varpeso01;
							 SumaVar = SumaVar + MultiPeso ;
						}
					 ArtXpeso = String.valueOf(SumaVar);
					 String co_checks = rsultfact257s.getString("co_check");
	
							double tot_netoDouble = Double.valueOf(tot_neto);
							
							double tot_netoUSD = (tot_netoDouble / tasaMoneda);
							
							 caja = co_venCaja;
							 montousd = String.valueOf(tot_netoUSD);
							 montobs = tot_neto;
							 cedula = co_cli;
							 fec_emisID = fec_emisCon;
					
							String fchfacemis = String.valueOf(datafac);
							
							String fechaEmitda = FechaEmil;
							token = rsult6.getString("token_bot");
							chatID = rsult6.getString("id_chat");
							
								
							checkoutpaco.add(new CheckOutFactPACO(nfact, co_checks, fch, hra, "VERIFIC",cantidaitem, monto_net,pesoprokg,caja,pesoprokg,pesoprokg,montousd,montobs,cedula,nombrecli,"0",fechaEmitda,ArtXpeso,token,chatID,"0"));
						}
									
					
					}
					

			}
			
			
			
			Statement stmsfact5 = con2.createStatement();
			String conSQLfact5 = "SELECT * FROM [dbo].[factura] WHERE [fact_num] = '" + nfacCheck + "' ";
			ResultSet rsultfact5 = stmsfact5.executeQuery(conSQLfact5);
			
			if(rsultfact5.next() != true){
				
				checkoutpaco.add(new CheckOutFactPACO(nfacCheck, "0", fch, hra, "0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"));
			}

			Statement stmsfact23 = con2.createStatement();
			String conSQLfact23 = "SELECT MAX([fact_num]) AS fact_num FROM [dbo].[factura] ";
			ResultSet rsultfact23 = stmsfact23.executeQuery(conSQLfact23);

			if (rsultfact23.next()) {

				int fact = rsultfact23.getInt("fact_num");
				int facin = Integer.parseInt(nfacCheck);

				if (facin > fact) {

					checkoutpaco.add(new CheckOutFactPACO(nfacCheck, "0", fch, hra, "0","0","0","0","0","0","0","0","0","0","0","0","0", "0","0","0","0"));
				}

			}
			
			

		} catch (Exception e) {
			System.out.print("\n ERROR : CheckOutFactPACOModel : " + e);
		}
		return checkoutpaco;
	}

}
