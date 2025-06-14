package com.tubes.salurin.model;

import com.tubes.salurin.interfaces.Verifiable;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "admin")
@Getter
@Setter
@NoArgsConstructor
public class Admin extends User implements Verifiable {
    @Override
    public void verifyCampaign(Campaign campaign){
        campaign.setOpen(true);
    }

    public void removeUser(User user) {
        user.setEmail("deleted_" + user.getEmail());
        user.setUsername("deleted_" + user.getUsername());
        user.setPassword("deleted");
    }

    public void removeCampaign(Campaign campaign){
        campaign.setOpen(false);
        campaign.setCampaignTitle("deleted_" + campaign.getCampaignTitle());
        campaign.setDescription("Campaign telah dihapus oleh admin.");
        campaign.setTargetAmount(0);
        campaign.setEndDate(campaign.getStartDate());
        campaign.setCampaigner(null); 
    }
}