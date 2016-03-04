package com.AngularProject.Rest;

import java.sql.Timestamp;
import java.util.Date;
import java.util.Map;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.criterion.Restrictions;

import com.AngularProject.Rest.Model.User;
import com.AngularProject.Rest.util.HibernateUtil;
import com.google.gson.Gson;

@Path("/user")
public class UserResource {

	//SessionFactory sessionFactory = HibernateUtil.getSessionFactory();
//	Session session = null;
	//Transaction tx = null;

	@POST
	@Path("/register")
	@Produces(MediaType.TEXT_PLAIN)
	@Consumes(MediaType.APPLICATION_JSON)
	public String registerUser(String json){
		
		  System.out.println("java data : "+json);
		  
		Map map=   new Gson().fromJson(json,Map.class);
		 System.out.println("Names : "+map.get("Names"));
		 System.out.println("Score : "+map.get("Score"));
/*

		System.out.println(json);

		User user =	new Gson().fromJson(json,User.class);
		System.out.println(user.getFirstName());
		Date date = new Date();
		user.setRegisteredTime(new Timestamp(date.getTime()));
		//System.out.println(" In UserDaoImpl.registerUser() GID : "+user.getGid()+" FirstName : "+user.getFirstName() +" LastName : "+user.getLastName() +" password : "+user.getPassword() + " emailId : "+user.getEmailId());
		try{
			session = sessionFactory.openSession();	

			tx = session.beginTransaction();
			session.save(user);
			tx.commit();
		}
		catch(Exception e){
			System.out.println("In UserDaoImpl.registerUser() exception: " +e);
			if (tx != null) {
				tx.rollback();
			}
		} finally {
			if (session != null)
				session.close();
		}

		return "User "+user.getFirstName()+" Registered Successfully";
		*/
		return "";
	}
/*

	@POST
	@Path("/login")
	@Consumes(MediaType.APPLICATION_JSON)
	public String validateUser(String json){
		User user =	new Gson().fromJson(json,User.class);
		try{
			session = sessionFactory.openSession();
			Criteria criteria = session.createCriteria(User.class);
			System.out.println(user.getEmail());
			System.out.println(user.getPword());
			criteria.add(Restrictions.eq("email", user.getEmail())).add(Restrictions.eq("pword", user.getPword()));

			if(!criteria.list().isEmpty())
			{
				user = ((User)criteria.list().get(0));
			}
		}
		catch(Exception e){
			System.out.println("In UserDaoImpl.verifyUser() exception: " +e);

		} finally {
			if (session != null)
				session.close();
		}

		return user.getFirstName();
	}
*/

}