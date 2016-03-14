package com.leastcount.model;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="GameDetails")
public class GameDetails {

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	@Column(name="GameID",nullable= false, length= 10)
	private int gameId;
	
	@Column(name="GameName",nullable= false, length= 100 )
	private String gameName;
	
	@Column(name="Winner",nullable= false, length= 100 )
	private String winner;
	
	@Column(name="WinningScore",nullable= false, length= 10 )
	private int winningScore;
	
	@Column(name="CreatedTime",nullable= false, length= 100 )
	private Timestamp cretaedTime;
	
	@Column(name="ActiveFlag",nullable= false, length= 1 )
	private int activeFlag;
	
	

	public String getWinner() {
		return winner;
	}

	public void setWinner(String winner) {
		this.winner = winner;
	}

	public int getWinningScore() {
		return winningScore;
	}

	public void setWinningScore(int winningScore) {
		this.winningScore = winningScore;
	}

	public int getActiveFlag() {
		return activeFlag;
	}

	public void setActiveFlag(int activeFlag) {
		this.activeFlag = activeFlag;
	}

	public int getGameId() {
		return gameId;
	}

	public void setGameId(int gameId) {
		this.gameId = gameId;
	}

	public String getGameName() {
		return gameName;
	}

	public void setGameName(String gameName) {
		this.gameName = gameName;
	}

	
	public Timestamp getCretaedTime() {
		return cretaedTime;
	}

	public void setCretaedTime(Timestamp cretaedTime) {
		this.cretaedTime = cretaedTime;
	}

}
