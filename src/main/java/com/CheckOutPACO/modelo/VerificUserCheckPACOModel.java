package com.CheckOutPACO.modelo;

import java.sql.Statement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

import com.CheckOutPACO.SQL.Paco_A;
import com.CheckOutPACO.entity.VerificUserCheckPACO;

public class VerificUserCheckPACOModel {
	
	Paco_A connet2 = new Paco_A();
	Connection con2 = connet2.getConnection();
	
	public List<VerificUserCheckPACO> findAll(String passUser){
		List<VerificUserCheckPACO> verificusercheckpaco = new ArrayList<VerificUserCheckPACO>();
		try {
			Statement stmsuser = con2.createStatement();
			String ConSQLcuser = "SELECT * FROM [dbo].[pos_access_keys_check] WHERE [pos_id] = '"+passUser+"' AND [default_price_level] = 'VERIFIC' AND [status_id] = '1' ";
			ResultSet rsultusr = stmsuser.executeQuery(ConSQLcuser);
			
			if(rsultusr.next()) {
				String pos_names = rsultusr.getString("pos_name");
				String co_cobs = rsultusr.getString("co_cob");
				
				verificusercheckpaco.add(new VerificUserCheckPACO(pos_names , co_cobs));
			}else {
				String pos_names = "0";
				String co_cobs = "0";
				
				verificusercheckpaco.add(new VerificUserCheckPACO(pos_names , co_cobs));
				
			}
			
			
		}catch(Exception e) {System.out.print("ERROR : VerificUserCheckPACOModel "  + e);}
		
		return verificusercheckpaco;
	}
}
