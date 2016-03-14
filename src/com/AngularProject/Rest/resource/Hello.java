package com.leastcount.resource;

import java.util.HashMap;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.google.gson.Gson;

@Path("/hello")
public class Hello {
	
	@GET
	@Produces(MediaType.TEXT_PLAIN)
	public String gotit(){
		return "This is hello from REST CLASS";
	}
	
	@GET
	@Path("/getdata")
	@Produces(MediaType.APPLICATION_JSON)
	public String getData(){
		HashMap<String,String> map = new HashMap<String,String>();
		map.put("name", "ravinder");
		map.put("name1", "Nishanth");
		map.put("name2", "Bharath");
		return new Gson().toJson(map);
		//return map;
	}
}
