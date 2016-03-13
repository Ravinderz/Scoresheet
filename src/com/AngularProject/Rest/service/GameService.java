package com.leastcount.service;

import java.util.List;

import com.leastcount.dao.GameDao;
import com.leastcount.model.Game;
import com.leastcount.model.GameDetails;
import com.leastcount.model.GameScoreCard;

public class GameService {
	
	GameDao gameDao = new GameDao();

	public String insertGame(GameDetails details,Game game,List playerNames)
	{
		return gameDao.insertGame(details, game,playerNames);
	
	}
	
	public String updateScoreCard(GameScoreCard gameScoreCard)
	{
		return gameDao.updateScoreCard(gameScoreCard);
	}
	
	public String gameStatsById(int gameId)
	{
		return gameDao.gameStatsById(gameId);
	}
	
}
