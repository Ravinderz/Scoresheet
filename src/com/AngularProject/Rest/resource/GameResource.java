package com.leastcount.resource;

import java.sql.Timestamp;
import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import com.google.gson.Gson;
import com.leastcount.model.Game;
import com.leastcount.model.GameDetails;
import com.leastcount.model.GameScoreCard;
import com.leastcount.service.GameService;

@Path("/game")
public class GameResource {
	
	GameService gameSer = new GameService();
	
	@POST
	@Path("/details")
	@Produces(MediaType.TEXT_PLAIN)
	@Consumes(MediaType.APPLICATION_JSON)
	public String registerGame(String json){
		
		  System.out.println("java data : "+json);
		  
		Map map=   new Gson().fromJson(json,Map.class);
		 System.out.println("Names : "+map.get("Names"));
		 System.out.println("Score : "+map.get("Score"));
		 List playerNames = (List)map.get("Names");
		 Game game= new Game();
		 //setting GameDetails 
		 GameDetails details = new GameDetails();
		 details.setActiveFlag(1);
		 details.setGameName("MyGame");
		 details.setWinningScore(Integer.parseInt((String) map.get("Score")));
		 details.setWinner("");
		 Date date = new Date();
		 details.setCretaedTime(new Timestamp(date.getTime()));
		 game.setFullCount(0);
		 game.setShowCount(0);
		 //setting Game
		 
		// game.setScores("");
		 
		String status = gameSer.insertGame(details,game,playerNames);
		System.out.println("Result : "+status);
		 
		return status;

}
	
	@POST
	@Path("/scorecard")
	@Produces(MediaType.TEXT_PLAIN)
	@Consumes(MediaType.APPLICATION_JSON)
	public String scoreCard(String json){
		String resp =null;
		  System.out.println("Entered GameResource.java incomming Json : "+json);
		  GameScoreCard gameScoreCard = new GameScoreCard();
		  gameScoreCard = new Gson().fromJson(json,GameScoreCard.class);
		  System.out.println("In GameResource.java GameScoreCard : "+new Gson().toJson(gameScoreCard));
		  
      resp = gameSer.updateScoreCard(gameScoreCard);
		return resp;
	}
	
	@POST
	@Path("/gameStats")
	@Produces(MediaType.TEXT_PLAIN)
	@Consumes(MediaType.APPLICATION_JSON)
	public String gameStats(String json){
		System.out.println("oooooo"+json);
		
		int gameId =Integer.parseInt(json);
		String resp = gameSer.gameStatsById(gameId);
		return resp;
	}
	
	
}
