package com.bae.persistence.repository;

import static javax.transaction.Transactional.TxType.REQUIRED;
import static javax.transaction.Transactional.TxType.SUPPORTS;

import javax.enterprise.inject.Default;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;
import javax.transaction.Transactional.TxType;

import com.bae.persistence.domain.Activity;
import com.bae.util.JSONUtil;

@Transactional(SUPPORTS)
@Default
public class UserDBRepository implements UserRepository {
	@PersistenceContext(unitName = "primary")
	private EntityManager manager;
	
	@Inject
	private JSONUtil util;

	@Override
	@Transactional(TxType.REQUIRED)
	public String createUser(String userJSON) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String getUser(String userEmail) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String getAllUsers() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	@Transactional(TxType.REQUIRED)
	public String updateUser(String userJSON, String userEmail) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	@Transactional(TxType.REQUIRED)
	public String deleteUser(String userEmail) {
		// TODO Auto-generated method stub
		return null;
	}
	
}
