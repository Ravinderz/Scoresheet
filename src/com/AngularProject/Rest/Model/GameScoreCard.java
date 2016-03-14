package com.leastcount.model;

import java.util.List;

public class GameScoreCard {
	
	private List<PlayerScoreCard> Details;
	
	private int GameId;
	
	private String Winner;

	public List<PlayerScoreCard> getDetails() {
		return Details;
	}

	public void setDetails(List<PlayerScoreCard> details) {
		Details = details;
	}

	public int getGameId() {
		return GameId;
	}

	public void setGameId(int gameId) {
		GameId = gameId;
	}

	public String getWinner() {
		return Winner;
	}

	public void setWinner(String winner) {
		Winner = winner;
	}
	
	
	

}
