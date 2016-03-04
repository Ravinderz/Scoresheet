package com.AngularProject.Rest.Model;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.xml.bind.annotation.XmlRootElement;

@Entity
@Table(name = "User")
@XmlRootElement
public class User {

	 @Id
	    @GeneratedValue(strategy = GenerationType.AUTO)
	    @Column(name = "UserId")
	    private int userId;
	 
	@Column(name="FirstName", nullable= false, length= 100 ) 
	private String firstName;
	
	@Column(name="LastName", nullable= false, length= 100 )
	private String lastName;
	
	@Column(name="Email", nullable= false, length= 100 )
	private String email;
	
	@Column(name="password", nullable= false, length= 100 )
	private String pword;
	
	@Column(name = "RegisteredTime", nullable = false, length = 6)
    private Timestamp registeredTime;
	
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	
	public String getPword() {
		return pword;
	}
	public void setPword(String pword) {
		this.pword = pword;
	}
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
	public Timestamp getRegisteredTime() {
		return registeredTime;
	}
	public void setRegisteredTime(Timestamp registeredTime) {
		this.registeredTime = registeredTime;
	}
	
	
	
	
}
