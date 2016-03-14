package com.leastcount.dao;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.criterion.Restrictions;

import com.google.gson.Gson;
import com.leastcount.common.HibernateUtil;
import com.leastcount.model.Game;
import com.leastcount.model.GameDetails;
import com.leastcount.model.GameScoreCard;

public class GameDao {
	SessionFactory sessionFactory = HibernateUtil.getSessionFactory();
	public String insertGame(GameDetails details,Game game,List playerNames)
	{
		Session session = null;
		Transaction detailstx = null;
		Transaction gametx = null;
		Map jsonMap = null;
		try{
			session = sessionFactory.openSession();	

			detailstx = session.beginTransaction();
			session.save(details);
			detailstx.commit();
			
			//take the gen gameId and store in game table
			gametx =session.beginTransaction();
			for(int i=0;i< playerNames.size();i++)
			{
				
				
				Game gameFin = new Game();
				gameFin.setGameId(details.getGameId());
				gameFin.setPlayers((String) playerNames.get(i));
			//	gameFin.setScores(" ");
				gameFin.setFullCount(0);
				gameFin.setShowCount(0);
				session.save(gameFin);
		
			}
			gametx.commit();
			jsonMap = new HashMap();
			jsonMap.put("Msg","Success");
			jsonMap.put("Id",details.getGameId());
			
		}
		catch(Exception e){
			System.out.println("In GameDao.insertGame() exception: " +e);
			if (detailstx != null) {
				detailstx.rollback();
			}
			if (gametx != null) {
				gametx.rollback();
			}
			jsonMap = new HashMap();
			jsonMap.put("err","LCA-01");
			
		} finally {
			if (session != null)
				session.close();
		}

		return new Gson().toJson(jsonMap);
		
	}
	public String updateScoreCard(GameScoreCard gameScoreCard)
	{
		System.out.println("Entered GameDao.java updateScoreCard GameScoreCard : "+new Gson().toJson(gameScoreCard));
		Session session = null;
		Transaction detailstx = null;
		Transaction gametx = null;
		Map jsonMap = null;
		try{
			session = sessionFactory.openSession();	
			int gameId = gameScoreCard.getGameId();
			//detailstx = session.beginTransaction();
			gametx =session.beginTransaction();
			for(int i=0;i< gameScoreCard.getDetails().size();i++)
			{
				String player = gameScoreCard.getDetails().get(i).getName();
				int fullCount = gameScoreCard.getDetails().get(i).getFullCount();
				int showCount = gameScoreCard.getDetails().get(i).getShows();
				
				Query query = session
		                .createQuery("UPDATE Game  SET fullCount = :fullCount, showCount = :showCount WHERE players = :players and gameId=:gameId");
		                query.setParameter("fullCount", fullCount);
		                query.setParameter("showCount", showCount);
		                query.setParameter("gameId", gameId);
		                query.setParameter("players", player);
		                query.executeUpdate();
		
			}
	
			String winner = gameScoreCard.getWinner();
			Query query = session
	                .createQuery("UPDATE GameDetails  SET winner = :winner, activeFlag = :activeFlag WHERE gameId = :gameId");
	                query.setParameter("winner", winner);
	                query.setParameter("gameId", gameId);
	                query.setParameter("activeFlag",0);
	                query.executeUpdate();
			gametx.commit();
			jsonMap = new HashMap();
			jsonMap.put("Msg","Success");
			
			
		}
		catch(Exception e){
			System.out.println("In GameDao.insertGame() exception: " +e);
		//	if (detailstx != null) {
		//		detailstx.rollback();
		//	}
			if (gametx != null) {
				gametx.rollback();
			}
			jsonMap = new HashMap();
			jsonMap.put("err","LCA-01");
			
		} finally {
			if (session != null)
				session.close();
		}

		return new Gson().toJson(jsonMap);
		
	}
	
	public String gameStatsById(int gameId)
	{
		Session session = null;
		List gameList ;
		List finShowsList = new ArrayList();
		List finFullCountList = new ArrayList();
		int playerCount = 0;
	//	 LOGGER.debug("BroadcastDaoImpl.getAvailableStream() entered");
         session = sessionFactory.openSession();
         Criteria criteria = session.createCriteria(Game.class);
         criteria.add(Restrictions.eq("gameId",gameId));
         if (!criteria.list().isEmpty()) {
        	 playerCount =criteria.list().size(); 
        	  gameList =criteria.list();
        	  for(int i=0;i<gameList.size();i++)
        	  {
        		 Game game =(Game)gameList.get(i);
        		 Map showMap = new HashMap();
        		 Map fullCountMap = new HashMap();
        		 showMap.put("name",game.getPlayers());
        		 showMap.put("count",game.getShowCount());
        		 fullCountMap.put("name",game.getPlayers());
        		 fullCountMap.put("count",game.getFullCount());
        		 finShowsList.add(showMap);
        		 finFullCountList.add(fullCountMap);
        	  }
         }
         Map statsMap = new HashMap();
         statsMap.put("Shows", finShowsList);
         statsMap.put("FullCount", finFullCountList);
         statsMap.put("PlayerCount",playerCount);
         System.out.println("finShowsList : "+new Gson().toJson(statsMap));
		return new Gson().toJson(statsMap);
		
	}
}
