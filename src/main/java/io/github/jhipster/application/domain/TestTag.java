package io.github.jhipster.application.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A TestTag.
 */
@Entity
@Table(name = "test_tag")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "testtag")
public class TestTag implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "active")
    private Boolean active;

    @Column(name = "name")
    private String name;

    @ManyToMany(mappedBy = "testTags")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<SalesOrderTest> salesOrderTests = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean isActive() {
        return active;
    }

    public TestTag active(Boolean active) {
        this.active = active;
        return this;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    public String getName() {
        return name;
    }

    public TestTag name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<SalesOrderTest> getSalesOrderTests() {
        return salesOrderTests;
    }

    public TestTag salesOrderTests(Set<SalesOrderTest> salesOrderTests) {
        this.salesOrderTests = salesOrderTests;
        return this;
    }

    public TestTag addSalesOrderTest(SalesOrderTest salesOrderTest) {
        this.salesOrderTests.add(salesOrderTest);
        salesOrderTest.getTestTags().add(this);
        return this;
    }

    public TestTag removeSalesOrderTest(SalesOrderTest salesOrderTest) {
        this.salesOrderTests.remove(salesOrderTest);
        salesOrderTest.getTestTags().remove(this);
        return this;
    }

    public void setSalesOrderTests(Set<SalesOrderTest> salesOrderTests) {
        this.salesOrderTests = salesOrderTests;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        TestTag testTag = (TestTag) o;
        if (testTag.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), testTag.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TestTag{" +
            "id=" + getId() +
            ", active='" + isActive() + "'" +
            ", name='" + getName() + "'" +
            "}";
    }
}
