package io.github.jhipster.application.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import org.springframework.data.elasticsearch.annotations.Document;
import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A SalesOrder.
 */
@Entity
@Table(name = "sales_order")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "salesorder")
public class SalesOrder implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "date_expected_delivery")
    private Instant dateExpectedDelivery;

    @Column(name = "date_confirmed")
    private Instant dateConfirmed;

    @Column(name = "date_samples_expected")
    private Instant dateSamplesExpected;

    @Column(name = "date_xml_exported")
    private Instant dateXmlExported;

    @Column(name = "date_modified")
    private Instant dateModified;

    @Column(name = "jhi_ref")
    private String ref;

    @Column(name = "jhi_comment")
    private String comment;

    @Column(name = "report_file")
    private String reportFile;

    @OneToOne
    @JoinColumn(unique = true)
    private User customer;

    @OneToOne
    @JoinColumn(unique = true)
    private User salesman;

    @OneToOne
    @JoinColumn(unique = true)
    private ReportType reportType;

    @OneToOne
    @JoinColumn(unique = true)
    private OrderType salesOrderType;

    @OneToOne
    @JoinColumn(unique = true)
    private Segment segment;

    @OneToOne
    @JoinColumn(unique = true)
    private PaymentMethod paymentMethod;

    @OneToOne
    @JoinColumn(unique = true)
    private OrderPriority orderPriority;

    @OneToOne
    @JoinColumn(unique = true)
    private OrderStatus orderStatus;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "sales_order_sales_order_test",
               joinColumns = @JoinColumn(name="sales_orders_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="sales_order_tests_id", referencedColumnName="id"))
    private Set<SalesOrderTest> salesOrderTests = new HashSet<>();

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "sales_order_sample",
               joinColumns = @JoinColumn(name="sales_orders_id", referencedColumnName="id"),
               inverseJoinColumns = @JoinColumn(name="samples_id", referencedColumnName="id"))
    private Set<Sample> samples = new HashSet<>();

    @OneToOne(mappedBy = "salesOrder")
    @JsonIgnore
    private Message message;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getDateExpectedDelivery() {
        return dateExpectedDelivery;
    }

    public SalesOrder dateExpectedDelivery(Instant dateExpectedDelivery) {
        this.dateExpectedDelivery = dateExpectedDelivery;
        return this;
    }

    public void setDateExpectedDelivery(Instant dateExpectedDelivery) {
        this.dateExpectedDelivery = dateExpectedDelivery;
    }

    public Instant getDateConfirmed() {
        return dateConfirmed;
    }

    public SalesOrder dateConfirmed(Instant dateConfirmed) {
        this.dateConfirmed = dateConfirmed;
        return this;
    }

    public void setDateConfirmed(Instant dateConfirmed) {
        this.dateConfirmed = dateConfirmed;
    }

    public Instant getDateSamplesExpected() {
        return dateSamplesExpected;
    }

    public SalesOrder dateSamplesExpected(Instant dateSamplesExpected) {
        this.dateSamplesExpected = dateSamplesExpected;
        return this;
    }

    public void setDateSamplesExpected(Instant dateSamplesExpected) {
        this.dateSamplesExpected = dateSamplesExpected;
    }

    public Instant getDateXmlExported() {
        return dateXmlExported;
    }

    public SalesOrder dateXmlExported(Instant dateXmlExported) {
        this.dateXmlExported = dateXmlExported;
        return this;
    }

    public void setDateXmlExported(Instant dateXmlExported) {
        this.dateXmlExported = dateXmlExported;
    }

    public Instant getDateModified() {
        return dateModified;
    }

    public SalesOrder dateModified(Instant dateModified) {
        this.dateModified = dateModified;
        return this;
    }

    public void setDateModified(Instant dateModified) {
        this.dateModified = dateModified;
    }

    public String getRef() {
        return ref;
    }

    public SalesOrder ref(String ref) {
        this.ref = ref;
        return this;
    }

    public void setRef(String ref) {
        this.ref = ref;
    }

    public String getComment() {
        return comment;
    }

    public SalesOrder comment(String comment) {
        this.comment = comment;
        return this;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public String getReportFile() {
        return reportFile;
    }

    public SalesOrder reportFile(String reportFile) {
        this.reportFile = reportFile;
        return this;
    }

    public void setReportFile(String reportFile) {
        this.reportFile = reportFile;
    }

    public User getCustomer() {
        return customer;
    }

    public SalesOrder customer(User user) {
        this.customer = user;
        return this;
    }

    public void setCustomer(User user) {
        this.customer = user;
    }

    public User getSalesman() {
        return salesman;
    }

    public SalesOrder salesman(User user) {
        this.salesman = user;
        return this;
    }

    public void setSalesman(User user) {
        this.salesman = user;
    }

    public ReportType getReportType() {
        return reportType;
    }

    public SalesOrder reportType(ReportType reportType) {
        this.reportType = reportType;
        return this;
    }

    public void setReportType(ReportType reportType) {
        this.reportType = reportType;
    }

    public OrderType getSalesOrderType() {
        return salesOrderType;
    }

    public SalesOrder salesOrderType(OrderType orderType) {
        this.salesOrderType = orderType;
        return this;
    }

    public void setSalesOrderType(OrderType orderType) {
        this.salesOrderType = orderType;
    }

    public Segment getSegment() {
        return segment;
    }

    public SalesOrder segment(Segment segment) {
        this.segment = segment;
        return this;
    }

    public void setSegment(Segment segment) {
        this.segment = segment;
    }

    public PaymentMethod getPaymentMethod() {
        return paymentMethod;
    }

    public SalesOrder paymentMethod(PaymentMethod paymentMethod) {
        this.paymentMethod = paymentMethod;
        return this;
    }

    public void setPaymentMethod(PaymentMethod paymentMethod) {
        this.paymentMethod = paymentMethod;
    }

    public OrderPriority getOrderPriority() {
        return orderPriority;
    }

    public SalesOrder orderPriority(OrderPriority orderPriority) {
        this.orderPriority = orderPriority;
        return this;
    }

    public void setOrderPriority(OrderPriority orderPriority) {
        this.orderPriority = orderPriority;
    }

    public OrderStatus getOrderStatus() {
        return orderStatus;
    }

    public SalesOrder orderStatus(OrderStatus orderStatus) {
        this.orderStatus = orderStatus;
        return this;
    }

    public void setOrderStatus(OrderStatus orderStatus) {
        this.orderStatus = orderStatus;
    }

    public Set<SalesOrderTest> getSalesOrderTests() {
        return salesOrderTests;
    }

    public SalesOrder salesOrderTests(Set<SalesOrderTest> salesOrderTests) {
        this.salesOrderTests = salesOrderTests;
        return this;
    }

    public SalesOrder addSalesOrderTest(SalesOrderTest salesOrderTest) {
        this.salesOrderTests.add(salesOrderTest);
        salesOrderTest.getSalesOrders().add(this);
        return this;
    }

    public SalesOrder removeSalesOrderTest(SalesOrderTest salesOrderTest) {
        this.salesOrderTests.remove(salesOrderTest);
        salesOrderTest.getSalesOrders().remove(this);
        return this;
    }

    public void setSalesOrderTests(Set<SalesOrderTest> salesOrderTests) {
        this.salesOrderTests = salesOrderTests;
    }

    public Set<Sample> getSamples() {
        return samples;
    }

    public SalesOrder samples(Set<Sample> samples) {
        this.samples = samples;
        return this;
    }

    public SalesOrder addSample(Sample sample) {
        this.samples.add(sample);
        sample.getSalesOrders().add(this);
        return this;
    }

    public SalesOrder removeSample(Sample sample) {
        this.samples.remove(sample);
        sample.getSalesOrders().remove(this);
        return this;
    }

    public void setSamples(Set<Sample> samples) {
        this.samples = samples;
    }

    public Message getMessage() {
        return message;
    }

    public SalesOrder message(Message message) {
        this.message = message;
        return this;
    }

    public void setMessage(Message message) {
        this.message = message;
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
        SalesOrder salesOrder = (SalesOrder) o;
        if (salesOrder.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), salesOrder.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SalesOrder{" +
            "id=" + getId() +
            ", dateExpectedDelivery='" + getDateExpectedDelivery() + "'" +
            ", dateConfirmed='" + getDateConfirmed() + "'" +
            ", dateSamplesExpected='" + getDateSamplesExpected() + "'" +
            ", dateXmlExported='" + getDateXmlExported() + "'" +
            ", dateModified='" + getDateModified() + "'" +
            ", ref='" + getRef() + "'" +
            ", comment='" + getComment() + "'" +
            ", reportFile='" + getReportFile() + "'" +
            "}";
    }
}
