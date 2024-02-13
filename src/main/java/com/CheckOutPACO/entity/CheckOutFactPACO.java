package com.CheckOutPACO.entity;

import java.time.LocalDateTime;
import java.util.Date;

public class CheckOutFactPACO {
	
	private String nfactura;
	private String co_ven ;
	private String fecha;
	private String hora;
	private String informacion;
	private String infocobro;
	private String infocantidad;
	private String infoart;
	
	private String caja;
	private String cantidadTem;
	private String peso;
	private String montousd;
	private String montobs;
	private String cedula;
	private String nombrecli;
	private String checkoutfech;
	private String fec_emis ;
	private String ArtXpeso;
	private String botToken;
	private String botIDchat;
	private String fechaComparacion;
	
	
	
	public String getFechaComparacion() {
		return fechaComparacion;
	}
	public void setFechaComparacion(String fechaComparacion) {
		this.fechaComparacion = fechaComparacion;
	}
	public String getBotToken() {
		return botToken;
	}
	public void setBotToken(String botToken) {
		this.botToken = botToken;
	}
	public String getBotIDchat() {
		return botIDchat;
	}
	public void setBotIDchat(String botIDchat) {
		this.botIDchat = botIDchat;
	}

	
	public String getNfactura() {
		return nfactura;
	}
	public void setNfactura(String nfactura) {
		this.nfactura = nfactura;
	}
	public String getCo_ven() {
		return co_ven;
	}
	public void setCo_ven(String co_ven) {
		this.co_ven = co_ven;
	}
	public String getFecha() {
		return fecha;
	}
	public void setFecha(String fecha) {
		this.fecha = fecha;
	}
	public String getHora() {
		return hora;
	}
	public void setHora(String hora) {
		this.hora = hora;
	}
	public String getInformacion() {
		return informacion;
	}
	public void setInformacion(String informacion) {
		this.informacion = informacion;
	}
	public String getInfocobro() {
		return infocobro;
	}
	public void setInfocobro(String infocobro) {
		this.infocobro = infocobro;
	}
	public String getInfocantidad() {
		return infocantidad;
	}
	public void setInfocantidad(String infocantidad) {
		this.infocantidad = infocantidad;
	}
	public String getInfoart() {
		return infoart;
	}
	public void setInfoart(String infoart) {
		this.infoart = infoart;
	}
	public String getCaja() {
		return caja;
	}
	public void setCaja(String caja) {
		this.caja = caja;
	}
	public String getCantidadTem() {
		return cantidadTem;
	}
	public void setCantidadTem(String cantidadTem) {
		this.cantidadTem = cantidadTem;
	}
	public String getPeso() {
		return peso;
	}
	public void setPeso(String peso) {
		this.peso = peso;
	}
	public String getMontousd() {
		return montousd;
	}
	public void setMontousd(String montousd) {
		this.montousd = montousd;
	}
	public String getMontobs() {
		return montobs;
	}
	public void setMontobs(String montobs) {
		this.montobs = montobs;
	}
	public String getCedula() {
		return cedula;
	}
	public void setCedula(String cedula) {
		this.cedula = cedula;
	}
	public String getNombrecli() {
		return nombrecli;
	}
	public void setNombrecli(String nombrecli) {
		this.nombrecli = nombrecli;
	}
	public String getCheckoutfech() {
		return checkoutfech;
	}
	public void setCheckoutfech(String checkoutfech) {
		this.checkoutfech = checkoutfech;
	}
	public String getFec_emis() {
		return fec_emis;
	}
	public void setFec_emis(String fec_emis) {
		this.fec_emis = fec_emis;
	}
	public String getArtXpeso() {
		return ArtXpeso;
	}
	public void setArtXpeso(String artXpeso) {
		ArtXpeso = artXpeso;
	}
	public CheckOutFactPACO(String nfactura, String co_ven, String fecha, String hora, String informacion,
			String infocobro, String infocantidad, String infoart, String caja, String cantidadTem, String peso,
			String montousd, String montobs, String cedula, String nombrecli, String checkoutfech, String fec_emis,
			String artXpeso, String botToken, String botIDchat, String fechaComparacion) {
		super();
		this.nfactura = nfactura;
		this.co_ven = co_ven;
		this.fecha = fecha;
		this.hora = hora;
		this.informacion = informacion;
		this.infocobro = infocobro;
		this.infocantidad = infocantidad;
		this.infoart = infoart;
		this.caja = caja;
		this.cantidadTem = cantidadTem;
		this.peso = peso;
		this.montousd = montousd;
		this.montobs = montobs;
		this.cedula = cedula;
		this.nombrecli = nombrecli;
		this.checkoutfech = checkoutfech;
		this.fec_emis = fec_emis;
		this.ArtXpeso = artXpeso;
		this.botToken = botToken;
		this.botIDchat = botIDchat;
		this.fechaComparacion= fechaComparacion;
	}
	
	public CheckOutFactPACO() {
		super();
	}


	
	
	
	
	

	
	
}

