package com.CheckOutPACO.controllers;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.MimeTypeUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.CheckOutPACO.entity.CheckOutFactPACO;
import com.CheckOutPACO.entity.VerificUserCheckPACO;

import com.CheckOutPACO.modelo.CheckOutFactPACOModel;

import com.CheckOutPACO.modelo.VerificUserCheckPACOModel;



@Controller
@RequestMapping("/api/ajaxrest")
public class ControllersAjax {
	
	
	@RequestMapping(value = "/verificarFactCheckOut/nfacCheck={nfacCheck}&userCheck={userCheck}", method = RequestMethod.POST, produces = {
			MimeTypeUtils.APPLICATION_JSON_VALUE })
	public ResponseEntity<List<CheckOutFactPACO>> verificarFactCheckOut(@PathVariable("nfacCheck") String nfacCheck , @PathVariable("userCheck") String userCheck) {
		try {
			CheckOutFactPACOModel checkoutpacoModel = new CheckOutFactPACOModel();
			ResponseEntity<List<CheckOutFactPACO>> responseEntity = new ResponseEntity<List<CheckOutFactPACO>>(
					checkoutpacoModel.findAll(nfacCheck , userCheck), HttpStatus.OK);
			return responseEntity;

		} catch (Exception e) {
			System.out.print("\n /verificarFactCheckOut " + e);
			return new ResponseEntity<List<CheckOutFactPACO>>(HttpStatus.BAD_REQUEST);

		}
	}
	
	@RequestMapping(value = "/verificUserCheckpassword/passUser={passUser}", method = RequestMethod.POST, produces = {
			MimeTypeUtils.APPLICATION_JSON_VALUE })
	public ResponseEntity<List<VerificUserCheckPACO>> verificarFactCheckOut(@PathVariable("passUser") String passUser ) {
		try {
			VerificUserCheckPACOModel verificusercheckpacomodel = new VerificUserCheckPACOModel();
			ResponseEntity<List<VerificUserCheckPACO>> responseEntity = new ResponseEntity<List<VerificUserCheckPACO>>(
					verificusercheckpacomodel.findAll(passUser), HttpStatus.OK);
			return responseEntity;

		} catch (Exception e) {
			System.out.print("\n /verificUserCheckpassword" + e);
			return new ResponseEntity<List<VerificUserCheckPACO>>(HttpStatus.BAD_REQUEST);

		}
	}
	
	
	


	
	
	
	
}
