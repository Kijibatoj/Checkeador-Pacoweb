package com.CheckOutPACO.vista;

import java.awt.BorderLayout;
import java.awt.Dimension;

import javax.swing.JScrollPane;
import javax.swing.JTable;
import javax.swing.table.DefaultTableModel;
import java.util.concurrent.TimeUnit;

import com.CheckOutPACO.SQL.Paco_A;

import java.sql.Connection;
import java.sql.ResultSet;

import java.sql.Statement;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

///Librerias copiadas de BtnFacturapersonal

import java.lang.String;

import javax.swing.AbstractButton;
import javax.swing.ImageIcon;
import javax.swing.JOptionPane;

import javax.swing.UIManager;

import tfhka.ve.Tfhka;

//

public class ImprimeFactura extends javax.swing.JFrame {

	public boolean Respuesta;
	public String label;
	public String localizador;
	String laf = UIManager.getSystemLookAndFeelClassName();
	public Tfhka Impresora;
	private AbstractButton miIngles;

	Connection conet;
	DefaultTableModel modelo;
	Statement st;
	ResultSet rs;

	Paco_A connet2 = new Paco_A();
	Connection con2 = connet2.getConnection();

	public ImprimeFactura() {
		setTitle("CHECK_OUT_PACOWEB");

		setIconImage(new ImageIcon(getClass().getResource("imggrec.jpg")).getImage());
		ListaProductos();
		Impresora = new tfhka.ve.Tfhka("/dev/ttyACM0");

		cmbPortList = new javax.swing.JComboBox();
		dtm = new javax.swing.table.DefaultTableModel();
		table = new javax.swing.JTable();
		scrollPane = new javax.swing.JScrollPane();
		jTablaMarket = new javax.swing.table.DefaultTableModel();

		String[] columnNames = { "N° Factura", "CAJERO", "FECHA_CHECK", "ULT", "N°" };
		Object[][] datos = { /* {"Juan",25,"false"},{"Juanito",35,"false"},{"Juana",45,"false"} */ };

		dtm = new DefaultTableModel(datos, columnNames);
		table = new JTable(dtm);

		// Agregar una nueva Columna

		// agragar nueva fila

		// modidicar celda especificas ;

		table.setPreferredScrollableViewportSize(new Dimension(600, 400));
		scrollPane = new JScrollPane(table);
		getContentPane().add(scrollPane, BorderLayout.CENTER);

	}

	void ListaProductos() {

		String sql = "SELECT * FROM print WHERE stadoprint ='yesPrinterHKA80'";

		try {

			st = conet.createStatement();
			rs = st.executeQuery(sql);
			String variable = "yesPrinterHKA80";

			if (variable == rs.getString("yesPrinterHKA80")) {
				try {
					for (int i = 0; i < table.getRowCount(); i++) {
						dtm.removeRow(i);
						i = i - 1;

						System.out.print("Espere su factura\n");
						/*
						 * Respuesta = Impresora.SendCmd("iR*20.290.694"); Respuesta =
						 * Impresora.SendCmd("iS*ELVIS BOLIVAR"); Respuesta =
						 * Impresora.SendCmd("i01Direccion: CARACAS, ARTIGAS"); Respuesta =
						 * Impresora.SendCmd("i02Telefono: 0424-857-3351"); Respuesta =
						 * Impresora.SendCmd("@DESCRIPCION DE PRODUCTOS INCLUIDOS"); Respuesta =
						 * Impresora.SendCmd("!000000053400001000CHUPETA BOM BUM C/U"); Respuesta =
						 * Impresora.SendCmd("3"); Respuesta = Impresora.SendCmd("101");
						 */
					}
				} catch (Exception e) {
					JOptionPane.showMessageDialog(null, "Error:");
				}
			}

		} catch (Exception e) {

		}

	}

	void reloading() {
		DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd");
		DateTimeFormatter dta = DateTimeFormatter.ofPattern("HH:mm:ss");

		String fch = dtf.format(LocalDateTime.now());
		String hra = dta.format(LocalDateTime.now());
		String sql2 = "UPDATE  print SET stadoprint = 'notPrinterHKA80' , selectx = '" + hra
				+ "' WHERE print.stadoprint ='yesPrinterHKA80'";

		try {

			st = conet.createStatement();
			rs2 = st.executeUpdate(sql2);

		} catch (Exception e) {

		}

	}

	public void load() {
		DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd");
		DateTimeFormatter dta = DateTimeFormatter.ofPattern("HH:mm:ss");
		String fch = dtf.format(LocalDateTime.now());
		String hra = dta.format(LocalDateTime.now());

		String ConSQLdat = "SELECT * FROM [dbo].[check_out_pacoweb] WHERE [fech_exit] = '" + fch + "T00:00:00' ";
		String ConSQLdat2 = "SELECT MAX([fact_num]) AS fact_num FROM [dbo].[check_out_pacoweb] ";
		try {
			Statement stmsdat = con2.createStatement();

			ResultSet rs = stmsdat.executeQuery(ConSQLdat);

			Statement stmsdat2 = con2.createStatement();

			ResultSet rs2 = stmsdat2.executeQuery(ConSQLdat2);

			Object[] ObjecRow = new Object[5];
			if (rs.next() && rs2.next()) {
				int datafac = rs2.getInt("fact_num");
				int datafac2 = rs.getInt("fact_num");
				int data = 1;

				
					while (rs.next()) {
						ObjecRow[0] = rs.getInt("fact_num");
						ObjecRow[1] = rs.getString("co_ven");
						ObjecRow[2] = rs.getString("fech_reg");
						ObjecRow[3] = rs.getString("fact_num");
						ObjecRow[4] = data;

						data++;
						
					}
					dtm.addRow(ObjecRow);
			}
			if(rs2.next() == true) {
				
				table.setModel(dtm);
			}
			

		} catch (Exception e) {

		}

	}

	public static void main(String[] args) throws InterruptedException {
		ImprimeFactura frame = new ImprimeFactura();
		frame.setUndecorated(true);
		frame.pack();
		frame.setVisible(true);
		frame.setBounds(0, 0, 600, 400);
		while (true) {
			frame.load();
			frame.ListaProductos();
			frame.reloading();
			TimeUnit.SECONDS.sleep(3600);

		}

	}

	private javax.swing.table.DefaultTableModel dtm;
	private javax.swing.JTable table;
	private javax.swing.JScrollPane scrollPane;
	private int rs2;
	private int rs3;
	private javax.swing.JComboBox cmbPortList;
	private javax.swing.table.DefaultTableModel jTablaMarket;

}
