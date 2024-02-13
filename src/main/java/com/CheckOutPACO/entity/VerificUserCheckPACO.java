package com.CheckOutPACO.entity;

public class VerificUserCheckPACO {

		private String co_cob;
		private String pos_name;
		
		public String getCo_cob() {
			return co_cob;
		}
		public void setCo_cob(String co_cob) {
			this.co_cob = co_cob;
		}
		public String getPos_name() {
			return pos_name;
		}
		public void setPos_name(String pos_name) {
			this.pos_name = pos_name;
		}
		public VerificUserCheckPACO(String co_cob, String pos_name) {
			super();
			this.co_cob = co_cob;
			this.pos_name = pos_name;
		}
		public VerificUserCheckPACO() {
			super();
		}
		
		
}
