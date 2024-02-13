package com.CheckOutPACO.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;



@Controller
@RequestMapping({ "/Index", "/" })
public class Controllers {
	
	@GetMapping("/")
	public ModelAndView getQRScan() {
		return new ModelAndView("InicioOn");

	}
	
	@GetMapping("/PACOwebCheck")
	public ModelAndView getQRScanchec() {
		return new ModelAndView("InicioOn");

	}
	@GetMapping("/OrdPago")
	public ModelAndView getOrdpago() {
		return new ModelAndView("OrdPago");

	}
	@GetMapping("/FactuaOnCobro")
	public ModelAndView getFactura() {
		return new ModelAndView("FactuaOnCobro");

	}
	@GetMapping("/InventarioRedu")
	public ModelAndView getInventarioRedu() {
		return new ModelAndView("InventarioRedu");

	}
	
}
